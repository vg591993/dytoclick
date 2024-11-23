// app/api/[...proxy]/route.ts
// This is a catch-all API route that will proxy all requests to the backend
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: { proxy: string[] } }
) {
  return handleProxy(request, params.proxy, 'GET')
}

export async function POST(request: Request) {
    try {
      const headersList = await headers()
      const authorization = headersList.get('authorization')
  
      if (!authorization?.startsWith('Basic ')) {
        return new NextResponse(JSON.stringify({ error: 'Invalid authorization header' }), {
          status: 401,
        })
      }
  
      // Forward the request to the backend
      const response = await fetch('https://cytoclick.ai/backend/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization,
        },
        // Prevent browser's default auth popup on the server side
        credentials: 'omit'
      })
  
      // Get the response data
      const responseData = await response.json().catch(() => null)
      
      // Get the authorization token from response headers
      const authToken = response.headers.get('authorization')
  
      if (response.ok) {
        return new NextResponse(JSON.stringify(responseData), {
          status: response.status,
          headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { 'Authorization': authToken } : {}),
          },
        })
      } else {
        // Return error response without triggering browser's auth popup
        return new NextResponse(
          JSON.stringify(responseData || { error: 'Authentication failed' }), 
          {
            status: response.status,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      }
    } catch (error) {
      console.error('Auth proxy error:', error)
      return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
  }

export async function PUT(
  request: Request,
  { params }: { params: { proxy: string[] } }
) {
  return handleProxy(request, params.proxy, 'PUT')
}

export async function DELETE(
  request: Request,
  { params }: { params: { proxy: string[] } }
) {
  return handleProxy(request, params.proxy, 'DELETE')
}

async function handleProxy(
  request: Request,
  proxy: string[],
  method: string
) {
  try {
    const headersList = await headers()
    const authorization = headersList.get('authorization')
    const contentType = headersList.get('content-type')

    // Reconstruct the path
    const path = proxy.join('/')
    const url = `https://cytoclick.ai/backend/${path}`

    // Prepare the fetch options
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': contentType || 'application/json',
        ...(authorization ? { 'Authorization': authorization } : {}),
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
      ...(method !== 'GET' && method !== 'HEAD' ? { body: await request.text() } : {}),
    };

    // Forward the request to the backend
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': contentType || 'application/json',
        'Authorization': authorization || '',
      },
      ...(method !== 'GET' && method !== 'HEAD' ? { body: await request.text() } : {}),
    })

    // Get all headers from the response
    const responseHeaders: Record<string, string> = {}
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value
    })

    // Return the proxied response
    return new NextResponse(await response.text(), {
      status: response.status,
      headers: responseHeaders,
    })
  } catch (error) {
    console.error(`Proxy error for ${method} /${proxy.join('/')}:`, error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}