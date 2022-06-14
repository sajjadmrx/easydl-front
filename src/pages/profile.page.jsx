import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/fontawesome-free-brands'
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LoadingContext } from 'react-router-loading';
import AuthContext from '../contexts/auth.context';
import { infoStore } from '../store/info.store';
import { PageWrapper } from '../Wrappers/pages.wrapper'
import { Table, Avatar, Badge } from 'react-daisyui'
import moment from 'moment'
export function ProfilePage() {
    const loadingContext = useContext(LoadingContext);
    const [downloads, setDownloads] = useState([]);
    useEffect(() => {
        document.title = `${infoStore.brandName.fa} - پروفایل`;
        loadingContext.done();
    }, [])

    const authContext = useContext(AuthContext);
    if (!authContext.isAuthenticated) {
        return <Redirect to="/" />
    }



    return (
        <PageWrapper>
            <div className=" shadow-md rounded-3xl lg:flex-row dark:bg-zinc-900/95">
                <main className="p-2 lg:py-8 lg:px-3 rounded-3xl dark:bg-zinc-900/95">

                    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div class="px-4 py-6 sm:px-0">
                            <div class="h-28 min-h-screen">
                                <div class="flex items-center justify-center">
                                    <div class="items-center">
                                        {/* ROW */}
                                        <div class="row flex-cols-2">
                                            <div class="col-span-1">
                                                <div className="stats shadow-lg">
                                                    <div className="stat">
                                                        <div className="stat-title">
                                                            پروفایل

                                                        </div>

                                                        <div className="stat-title">
                                                            {authContext.user.username}
                                                        </div>
                                                        <div className="stat-desc ">
                                                            {authContext.user.email}
                                                        </div>

                                                        <div className="stat-figure ">
                                                            <div className="avatar online">
                                                                <div className="w-14 rounded-full">
                                                                    <img src={authContext.user.avatar} />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <div className="stat">
                                                        <div className="stat-figure ">
                                                            <FontAwesomeIcon icon={['fas', 'star']} size={'2x'}></FontAwesomeIcon>
                                                        </div>
                                                        <div className="stat-title">وضعیت اشتراک</div>
                                                        <div className="stat-value ">ندارید</div>
                                                    </div>

                                                    <div className="stat">
                                                        <div className="stat-figure ">
                                                            <FontAwesomeIcon icon={['fas', 'download']} size={'2x'}></FontAwesomeIcon>
                                                        </div>
                                                        <div className="stat-title">تعداد دانلود</div>
                                                        <div className="stat-value ">{downloads.length}</div>
                                                    </div>
                                                    <div className="stat">
                                                        <div className="stat-figure ">
                                                            <FontAwesomeIcon icon={faSpotify} size={'2x'}></FontAwesomeIcon>
                                                        </div>
                                                        <div className="stat-title">وضعیت  اکانت اسپاتیفای</div>
                                                        <div className="stat-value ">
                                                            <span className='badge badge-error'>غیرفعـال</span>
                                                        </div>
                                                    </div>



                                                </div>

                                            </div>
                                            <div class="col-span-1 mt-5">
                                                <h3 className="text-2xl font-bold mb-2 mt-2"> دانلودها</h3>
                                                <div className='overflow-x-auto mt-3'>
                                                    <Table className=' shadow-lg'>
                                                        <Table.Head>
                                                            <span>#</span>
                                                            <span>نام</span>
                                                            <span>پلتفرم</span>
                                                            <span>لینک دریافتی</span>
                                                            <span>موفق امیز؟</span>
                                                            <span>تاریخ</span>
                                                        </Table.Head>

                                                        <Table.Body>
                                                            <Table.Row>
                                                                <span>
                                                                    1
                                                                </span>
                                                                <span>KODEX</span>
                                                                <span>
                                                                    <FontAwesomeIcon icon={['fas', 'music']} />
                                                                    Radio Javan
                                                                </span>
                                                                <span>
                                                                    <a href="https://www.google.com">
                                                                        https://www.google.com
                                                                    </a>
                                                                </span>
                                                                <span>
                                                                    <Badge color={"green"}>
                                                                        <FontAwesomeIcon icon={['fas', 'check']} />
                                                                    </Badge>
                                                                </span>
                                                                <span>
                                                                    {moment().format('YYYY/MM/DD')}
                                                                </span>
                                                            </Table.Row>


                                                        </Table.Body>
                                                    </Table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </PageWrapper>
    )
}