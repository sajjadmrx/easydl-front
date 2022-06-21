import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputSearchValueContext } from '../contexts/inputSearchValue.context';
import { axiosError } from '../handlers/error.handler';
import { radioJavanService, soundcloudService, spotifyService } from '../service/index.service';

import { isLink, isRjLinkMp3, isRjLinkPodCast, isSoundcloudLink, isSpotifyLink } from '../utils/regex.util';
import { ErrroAlertComponent } from './alerts.component';


export function SearchForm(props) {
    const setSongs = props.setSongs;
    const [errorState, setErrorState] = React.useState(false);
    const [buttonText, setButtonText] = React.useState('');
    const { setinputSearchValue } = React.useContext(InputSearchValueContext);
    useEffect(() => {
        if (!buttonText) {
            setButtonText('📥    جستجو و دانلود');
        }
    }, [buttonText])
    useEffect(() => {
        if (errorState && errorState != '') {
            toast.error(errorState)
        }
    }, [errorState])
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs, setErrorState, setButtonText, setinputSearchValue)}>
            <input type="text" placeholder="لینک مورد نظر را وارد کنید..." className="input w-full max-w-xs mb-2 input-bordered input-accent" />
            {errorState && <ErrroAlertComponent className='mb-2' text={errorState} />}
            <button className="btn btn-wide ">
                {buttonText}
            </button>
            <ToastContainer theme='dark' />
        </form>
    )
}
async function submitHandler(e, setSongs, setErrorState, setButtonText, setinputSearchValue) {
    e.preventDefault();
    setSongs([]);
    setErrorState(false);
    let value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        toast.error('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isRjLinkMp3(value): targetUrl = 'rj'; break;
        case isRjLinkPodCast(value): targetUrl = 'rj-podcast'; break;
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        case isSoundcloudLink(value): targetUrl = 'soundcloud'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        toast.error('لطفا یک لینک معتبر وارد کنید')
        return;
    }
    try {
        if (targetUrl == 'rj') {
            button.classList.add('loading');
            await radioJavanService.downloadMp3(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText('')
                    button.classList.remove('loading');
                }
            })
            button.classList.remove('loading');
        }
        if (targetUrl == 'rj-podcast') {
            button.classList.add('loading');
            await radioJavanService.downloadPodCast(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText('')
                    button.classList.remove('loading');
                }
            })
            button.classList.remove('loading');
        }
        else if (targetUrl == 'soundcloud') {
            button.classList.add('loading');
            await soundcloudService.download(value, (progress) => {
                setButtonText(`${progress}% در حال دانلود ...`)
                if (progress == 100) {
                    setButtonText('')
                    button.classList.remove('loading');
                }
            })
            button.classList.remove('loading');
            return;
        }
        else if (targetUrl == 'spotify') {
            button.classList.add('loading');
            const indexOf = value.indexOf("&")
            if (indexOf > 0) {
                value = value.substring(0, indexOf)
            }
            const data = await spotifyService.search(value)
            setSongs(data);
            button.classList.remove('loading');
            setinputSearchValue(value);
            return;
        }
        else {
            toast.error('لطفا یک لینک معتبر وارد کنید')
        }
    } catch (error) {
        axiosError(error, setErrorState)
    } finally {
        button.classList.remove('loading');
        setButtonText('')
    }
}



