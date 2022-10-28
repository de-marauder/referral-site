import React from 'react'
import { useState } from 'react'

export default function Body({ users }) {

    const topUsers = users?.sort((a, b)=>{
        if (a.referralCount > b.referralCount) return -1;
        if (a.referralCount < b.referralCount) return 1;
        if (a.referralCount === b.referralCount) return 0;
    })

    const topContestants = topUsers?.slice(0, 10);

    return (
        <section className="about container">
            <h1>Bigi Referral Challenge</h1>
            <div className='table'>
                <div className="row header">
                    <div>Participants</div>
                    <div>Referrals</div>
                </div>
                {topContestants?.map((user, id) => {
                    return (
                        <div key={id} className="row">
                            <div>{user?.firstName + ' ' + user?.lastName}</div>
                            <div>{user?.referralCount}</div>
                        </div>
                    )
                })}
            </div>
            <button className="btn">Register</button>
        </section>
    )
}
