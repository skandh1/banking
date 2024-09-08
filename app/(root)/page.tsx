import HeaderBox from '@/components/ui/HeaderBox'
import RightSideBar from '@/components/ui/RightSideBar'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox'
import React from 'react'

const Home = () => {
  const loggedIn = {firstName: "super", lastName: "king ", email: "super@gmail.com"}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="welcome"
            user={loggedIn?.firstName || "guest"}
            subtext="to our banking platform"
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1235.34}
          />
        </header>
    Recent transactions 
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[{currentBalance: 23.50}, {currentBalance: 23.50}]}

      />
    </section>
    
  )
}

export default Home