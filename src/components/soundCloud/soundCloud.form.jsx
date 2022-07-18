import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { soundcloudService } from "../../service/index.service";
import { isLink } from "../../utils/regex.util";

export function SoundCloudFormComponent(props) {
    const [buttonText, setButtonText] = useState('دانلود')
    const [waiting, setWaiting] = useState(false)
    useEffect(() => {
        if (buttonText == null)
            setButtonText('دانلود')
    }, [buttonText])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => downloadHandler(e, setWaiting, setButtonText)}>
            <input type="text" placeholder="لینک سینگل موزیک خود را وارد کنید..." className="input input-bordered input-warning  w-full max-w-xs mb-2" />
            <button className={`btn btn-wide ${waiting && "loading"}`}>
                {!waiting && <FontAwesomeIcon icon={['fas', 'download']} className='mr-2' />}
                {buttonText}
            </button>
        </form >
    )
}

function downloadHandler(e, setWaiting, setButtonText) {
    try {
        e.preventDefault();
        let value = e.target.querySelector('input').value;
        if (!value || !isLink(value)) return;
        setWaiting(true)
        setButtonText("لطفا صبر کنید...")
        soundcloudService.download(value, (prog) => {
            if (prog == 100) {
                setWaiting(false)
                setButtonText(null)
            }
        })
    } catch (error) {
        setWaiting(false)
        setButtonText(null)
    }
}