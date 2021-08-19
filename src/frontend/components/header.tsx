import { FC } from "react"
import Link from "next/link"
import Image from "next/image"

const Header: FC = () => {
    return (
        <nav className="text-white fixed px-4 py-4 bg-gray-900 min-w-full font-semibold z-10">
            <div className="flex flex-row">
                <div className="mx-3 p-1 cursor-pointer">
                    <Link
                        href="/"
                        passHref={true}
                    >
                        <p className="text-lg">Authorization</p>
                    </Link>
                </div>
                <div className="mt-1 mx-3 p-1 cursor-pointer">
                    <Link
                        href="/commands"
                        passHref={true}
                    >
                        <p className="text-base">명령어</p>
                    </Link>
                </div>
                <div className="mt-1 mx-3 p-1 cursor-pointer">
                    <Link
                        href={String(process.env.INVITE_URL)}
                        passHref={true}
                    >
                        <p className="text-base">초대하기</p>
                    </Link>
                </div>
                <div className="mt-1 mx-3 p-1 cursor-pointer">
                    <Link
                        href={String(process.env.DISCORD_URL)}
                        passHref={true}
                    >
                        <p className="text-base">서포트 서버</p>
                    </Link>
                </div>
                <div className="mx-3 p-1 cursor-pointer ml-auto mt-1">
                    <Link
                        href={String(process.env.OAUTH_URL)}
                        passHref={true}
                    >
                        <Image
                            src="/img/login.png"
                            alt="Login"
                            width={22}
                            height={22}
                        />
                    </Link>
                </div>
            </div>
            
        </nav>
    )
}

export default Header