import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosError } from '../handlers/error.handler';
import { radioJavanService, soundcloudService, spotifyService } from '../service/index.service';

import { isLink, isRjLinkMp3, isRjLinkPodCast, isSoundcloudLink, isSpotifyLink } from '../utils/regex.util';

import { Tabs } from 'flowbite-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud } from '@fortawesome/fontawesome-free-brands';
import { faMusic } from '@fortawesome/fontawesome-free-solid';
import { SpotifyFormComponent } from './spotify/spotify.form';
import { SoundCloudFormComponent } from './soundCloud/soundCloud.form';
import { RadioJavanFormComponent } from './radioJavan/radioJavan.form';
import { SpotifyComponent } from './spotify/spotify.component';
import { SoundCloudComponent } from './soundCloud/soundCloud.component';
import { RadioJavanComponent } from './radioJavan/radioJavan.component';

export function PlatformsTab(props) {
    return (
        <Tabs.Group
            aria-label="Tabs with icons"
            style="underline"

        >
            <Tabs.Item
                title="اسپاتیفای"
                icon={() => <FontAwesomeIcon icon={faSpotify} className="mr-2" />}
                active={true}
            >
                <SpotifyComponent />
            </Tabs.Item>
            <Tabs.Item
                title="سوند کلاود"
                icon={() => <FontAwesomeIcon icon={faSoundcloud} className="mr-2" />}
            >
                <SoundCloudComponent />
            </Tabs.Item>
            <Tabs.Item
                active={true}
                title="رادیو جوان"
                icon={() => <FontAwesomeIcon icon={faMusic} className="mr-2" />}
            >
                <RadioJavanComponent />
            </Tabs.Item>


        </Tabs.Group>
    )
}
