import { NextPage  } from "next"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import api from "../../utils/api"

const verify = (token: string | null, setStatus: Dispatch<SetStateAction<boolean>>) => {
    if (!token)
        return alert('?')
    
    api.post('/auth/verify', {
        code: localStorage.getItem('code'),
        refresh_token: localStorage.getItem('refresh_token'),
        captcha_token: token
    }).then(res => {
        const { data } = res

        if (!data.success)
            return location.href = String(process.env.OAUTH_URL)

        setStatus(true)
    })
}

const AuthVerify: NextPage = () => {
    const [verifyStatus, setStatus] = useState<boolean>(false)

    useEffect(() => {
        const code = localStorage.getItem('code')
        const refresh_token = localStorage.getItem('refresh_token')
        if (!code || !refresh_token)
            return alert('무언가 하나가 빠진것 같은 느낌인데요!')
    }, [])

    if (!verifyStatus)
        return (
            <p className="text-center mt-28">
                <p className="text-4xl mb-12">
                    사람인걸 인증해주세요!
                </p>
                <form className="inline-block">
                    <ReCAPTCHA
                        size="normal"
                        sitekey={String(process.env.RECAPTCHA_KEY)}
                        onChange={token => verify(token, setStatus)}
                    />
                </form>
            </p>
        )
    
    return (
        <p className="text-center mt-28">
            <p className="text-4xl">사람인걸 확인했어요!</p>
            <p className="text-4xl">이제 이 창을 닫아도 되요!</p>
        </p>
    )
}

export default AuthVerify