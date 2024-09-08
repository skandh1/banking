'use client';
import CountUp from 'react-countup'

const AnimatedCounter = ({ amount }: { amount: number }) => {
    return (
        <>
            <CountUp
                start={0}
                end={amount}
                duration={1}
                prefix='$'
            />
        </>

    )
}

export default AnimatedCounter