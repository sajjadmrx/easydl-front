import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { radioJavanService, soundcloudService } from "../../service/index.service";
import { isLink, isRjLinkMp3, isRjLinkPodCast } from "../../utils/regex.util";

export function RadioJavanFormComponent(props) {
    const [buttonText, setButtonText] = useState('دانلود')
    const [waiting, setWaiting] = useState(false)
    useEffect(() => {
        if (buttonText == null)
            setButtonText('دانلود')
    }, [buttonText])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => downloadHandler(e, setWaiting, setButtonText)}>
            <input type="text" placeholder="لینک موزیک یا پادکست را وارد کنید..." className="input input-bordered input-error   w-full max-w-xs mb-2" />
            <button className={`btn btn-wide ${waiting && "loading"}`}>
                {!waiting && <FontAwesomeIcon icon={['fas', 'download']} className='mr-2' />}
                {buttonText}
            </button>
        </form >
    )
}

async function downloadHandler(e, setWaiting, setButtonText) {
    try {

        e.preventDefault();
        let value = e.target.querySelector('input').value;
        if (!value || !isLink(value)) return;

        let targetUrl = 'unknown'
        switch (true) {
            case isRjLinkMp3(value): targetUrl = 'rj'; break;
            case isRjLinkPodCast(value): targetUrl = 'rj-podcast'; break;

            default: targetUrl = 'unknown'; break;
        }

        if (targetUrl == 'unknown') {
            alert('لطفا یک لینک معتبر وارد کنید')
            return;
        }

        setWaiting(true)
        setButtonText("لطفا صبر کنید...")
        if (targetUrl == 'rj') {

            await radioJavanService.downloadMp3(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText(null)
                    setWaiting(false)
                }
            })

        }
        if (targetUrl == 'rj-podcast') {
            await radioJavanService.downloadPodCast(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText(null)
                    setWaiting(false)
                }
            })
        }
    } catch (error) {
        setWaiting(false)
        setButtonText(null)
    }
}



