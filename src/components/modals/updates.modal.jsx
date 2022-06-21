import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Badge } from "react-daisyui";
import { MainModalComponent } from "./main.modal";

export function UpdatesModalComponent(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRead, setIsRead] = useState(false);
    const [isReadV, setIsReadV] = useState(false);
    let version = '1.0'

    useEffect(() => {
        const hasVs = localStorage.getItem(`isReadV_${version}`)
        if (hasVs)
            setIsRead(true)
        else {
            setIsOpen(true)
            setIsReadV(true)
        }
    }, [])


    useEffect(() => {
        if (isReadV)
            saveHanlder(version)
    }, [isReadV])



    const update = {
        'new': [
            '👤 اضافه شدن پنل کاربری',
            '🎺 اضافه شدن دانلود پادکست های رادیوجوان'
        ]
    };

    const newHtml = update.new.map(item => {
        return (
            <div className="d-flex align-items-center">
                <i className="fa fa-circle m-r-10 text-success"></i>
                <span>{item}</span>
            </div>
        )
    })//.join('\n')

    // const allWioutNew = Object.keys(update).filter(item => {
    //     return item !== 'new'
    // })
    // const updateDetails = allWioutNew.map(item => {
    //     let parent = (<div className="list-group list-group-flush m-t-10">
    //         <hr />
    //         <span className="text-muted">نسخه ${item}</span>
    //         {data}
    //     </div>);


    //     const a = update[item].map(detail => {
    //         return (<div className="list-group-item p-t-b-10 p-l-r-0 d-flex align-items-center justify-content-between">
    //             <div className="d-flex align-items-center">
    //                 <i className="fa fa-circle m-r-10 text-dark"></i>
    //                 <span>${detail}</span>
    //             </div>
    //         </div>)
    //     })

    //     parent = parent.replace('{data}', a.join('\n'))
    //     return parent
    // })
    return (
        <MainModalComponent isOpen={isOpen} setIsOpen={setIsOpen}>
            <h1 className="text-center">

                🎉 نسخه جدید منتشـر شد.

            </h1>
            <span className="text-muted">تغییرات جدید</span>
            <div className="m-t-10">

                {/* row card */}
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="flex flex-col-reverse divide-y divide-y-reverse divide-gray-500">
                                    {newHtml}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


            {/* {updateDetails.join('')} */}


            <div className="modal-footer">


                {/* flex vs text and btn close */}

                <div className="d-flex align-items-center">
                    <span className="text-muted">نسخه {version}</span>
                </div>
                <div className="text-center">
                    <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon="times" className="mr-2" />
                        بستن
                    </button>
                </div>
            </div>


        </MainModalComponent >
    )

}

function saveHanlder(vs) {
    const isReadBofer = localStorage.getItem(`isReadV_${vs}`);
    if (!isReadBofer) {
        localStorage.setItem(`isReadV_${vs}`, '1');
    }
}