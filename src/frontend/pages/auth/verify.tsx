import { NextPage  } from "next"
import { useEffect } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import api from "../../utils/api"

const verify = (token: string | null) => {
    alert(token)
}

const AuthVerify: NextPage = () => {
    useEffect(() => {
        
    }, [])

    return (
        <p className="text-center mt-28">
            <p className="text-4xl mb-12">
                사람인걸 인증해주세요!
            </p>
            <form className="inline-block">
                <ReCAPTCHA
                    size="normal"
                    sitekey={String(process.env.RECAPTCHA_KEY)}
                    onChange={verify}
                />
            </form>
        </p>
    )
}

export default AuthVerify