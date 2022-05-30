import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ApiService } from '../service/api.service';
import { RadioJavanService } from '../service/rj.service';
import { SpotifyService } from '../service/spotify.service';
import { isLink, isRjLink, isSpotifyLink } from '../utils/regex.util';

const apiService = new ApiService()
const spotifyService = new SpotifyService(apiService)
const rjService = new RadioJavanService(apiService)
export function SearchForm(props) {
    const setSongs = props.setSongs;
    return (
        <form className="flex flex-col items-center" onSubmit={(e) => submitHandler(e, setSongs)}>
            <input type="text" placeholder="لینک موزیک اسپاتیفای یا رادیوجوان" className="input w-full max-w-xs mb-2" />
            <button className="btn btn-wide ">
                📥    جستجو و دانلود
            </button>
            <ToastContainer theme='dark' />
        </form>
    )
}
async function submitHandler(e, setSongs) {
    e.preventDefault();
    setSongs([]);
    const value = e.target.querySelector('input').value;
    const button = e.target.querySelector('button');
    if (!value || !isLink(value)) {
        toast.error('لطفا یک لینک معتبر وارد کنید', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return;
    }
    let targetUrl = ''
    switch (true) {
        case isRjLink(value): targetUrl = 'rj'; break;
        case isSpotifyLink(value): targetUrl = 'spotify'; break;
        default: targetUrl = 'unknown';
    }

    if (targetUrl == 'unknown') {
        toast.error('لطفا یک لینک معتبر وارد کنید', {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return;
    }
    try {
        if (targetUrl == 'rj') {
            button.classList.add('loading');

            await rjService.download(value, (progress) => {
                //change button text
                button.innerText = `${progress}% در حال دانلود ...`;
                if (progress == 100) {
                    button.innerText = '📥    جستجو و دانلود';
                    button.classList.remove('loading');
                }
            })

            button.classList.remove('loading');
        }
        else if (targetUrl == 'spotify') {
            button.classList.add('loading');
            const data = await spotifyService.search(value)
            setSongs(data);
            button.classList.remove('loading');
        }
        else {
            toast.error('لطفا یک لینک معتبر وارد کنید')
        }
    } catch (error) {
        console.log(error);
        toast.error('خطایی رخ داده است')
    } finally {
        button.classList.remove('loading');
    }
}



