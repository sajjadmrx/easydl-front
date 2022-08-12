import { Table, Avatar, Badge, Input } from 'react-daisyui'
import moment from 'moment-jalaali'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faSoundcloud, } from '@fortawesome/fontawesome-free-brands'
import { faMusic } from '@fortawesome/fontawesome-free-solid'
const platforms = [{
    name: 'spotify',
    icon: faSpotify,
    faName: 'اسپاتیفای'
},
{
    name: 'soundcloud',
    icon: faSoundcloud,
    faName: 'ساوندکلاود'
},
{
    name: 'radiojavan',
    icon: faMusic,
    faName: 'رادیو جوان'
}
]

export function HistoryItem(props) {
    const index = props.index + 1
    const item = props.item
    const platform = platforms.find(p => p.name === item.platform.toLowerCase())
    return (
        <tr className="bg-gray-800">
            <td className="p-3">
                {index}
            </td>
            <td className="p-3">

                <Input type="text" value={item.filename} readOnly />

            </td>
            <td className="p-3 font-bold">
                <FontAwesomeIcon icon={platform.icon} />
                <span className="ml-2">{platform.faName}</span>
            </td>
            <td className="p-3">
                <Input type="text" value={item.url} readOnly />
            </td>
            <td className="p-3">
                <span className="bg-green-400 text-gray-50 rounded-md px-2">
                    <FontAwesomeIcon icon={['fas', 'check']} size={'1x'} />
                </span>
            </td>

            <td className="p-3 text-right">
                {moment(item.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')}
            </td>

        </tr>
    )
}