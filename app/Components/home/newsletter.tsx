import React from 'react';
import newsPic from '@/public/images/home/news.png';

const Newsletter: React.FC = () => {
    return (
        <div className='border-[#C8C8C8] border border-1 rounded-xl px-5 py-5 sm:px-10 sm:py-12'>
            <div className="flex flex-col items-center justify-center gap-3">
                <p className='text-2xl font-bold'>{'Subscribe to the Rihlatik.com newsletter'}</p>
                <p className='text-md text-gray-600'>{'Receive exclusive deals and offers straight to your inbox.'}</p>
                <img src={newsPic.src} alt="newsletter" className='w-80 h-80 object-cover' />
                <label className='self-start' htmlFor="emailAddress">Your Email Address</label>
                <div className="form self-start w-1/2 sm:w-full md:w-2/3">
                    <form>
                        <div className="flex gap-2">
                            <input type="text" placeholder='Your email address' className='border py-2 px-3 w-full rounded-lg' id='emailAddress' />
                            <button className='btn bg-[#A7A8AB] text-white rounded-lg py-2 px-4'>{'Subscribe'}</button>
                        </div>
                    </form>
                </div>
                <div className="flex gap-3 items-center self-start">
                    <input type="checkbox" name="newsletter" id="newsletter" />
                    <label htmlFor="newsletter" className='text-gray-400 font-semibold'>I agree to receive offers according to conditions mentioned in <span className='text-[#FF9020] underline'>our Privacy Policy.</span></label>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;