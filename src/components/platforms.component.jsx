export function PlatFormsComponent() {
    return (
        <div className="mt-3 animate__animated  animate__rotateInDownLeft shadow-xl ">
            <div className="text-base-content rounded-box">
                <h2 className="text-lg text-center py-3 ">
                    پلتفرم های پشتیبانی شده
                </h2>
                <div className="grid grid-cols-3 gap-4 mb-4 py-4">
                    <div className="grid h-25 card rounded-box place-items-center mb-2">
                        <div className="avatar online">
                            <div className="w-16 rounded-xl ">
                                <img src="/brands/spotify.png" alt="sound" />

                            </div>
                        </div>
                        <p className="text-center text-base-content ">
                            اسپاتیفای
                        </p>
                    </div>
                    <div className="grid h-25 card rounded-box place-items-center mb-2">
                        <div className="avatar online">
                            <div className="w-16 rounded-xl">
                                <img src="/brands/rj.png" alt="Rj" />
                            </div>
                        </div>
                        <p className="text-center text-base-content ">
                            رادیوجوان
                        </p>
                    </div>
                    <div className="grid h-25 card rounded-box place-items-center mb-2">
                        <div className="avatar online">
                            <div className="w-16 rounded-xl">
                                <img src="/brands/soundcloud.png" alt="sound-cloud" />
                            </div>
                        </div>
                        <p className="text-center text-base-content ">
                            سوند کلاود
                        </p>
                    </div>


                </div>
            </div>
        </div>
    )
}