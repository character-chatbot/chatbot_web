import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      // 이메일 확인 성공 후 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        if (!user.user_metadata.name || !user.user_metadata.full_name) {
          // 쿠키 설정을 위해 Response 객체 사용
          const response = NextResponse.redirect(new URL('/auth/complete-profile', request.url))
          response.cookies.set('auth-state-changed', 'true', { maxAge: 1 })
          return response
        } else {
          return NextResponse.redirect(new URL('/', request.url))
        }
      } else {
        // 사용자 정보를 가져오지 못한 경우
        return NextResponse.redirect(new URL('/error?message=' + encodeURIComponent('사용자 정보를 가져오는데 실패했습니다.'), request.url))
      }
    } else {
      console.log(error)
    }
  }

  return NextResponse.redirect(new URL('/error?message=' + encodeURIComponent('이메일 인증에 실패했습니다.'), request.url))
}