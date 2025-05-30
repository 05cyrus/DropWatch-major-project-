import React from 'react';
import './styles.css';
import Beams from '../../Common/Beam/Beam';
import SplitText from "../../Common/SplitText/SplitText";
import Button from '../../Common/Button';
import iphone from '../../../assets/iphone.png'; 
import gradient from '../../../assets/gradient.png';
import {motion} from 'framer-motion';
import { Link } from 'react-router-dom';

function MainComponent() {
  return (
    <div className='beams'>
        <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#f94141"
            speed={2}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={30}
        />
        <div className='flex-info'>
            <div className='left-component'>
                    <SplitText
                        text="Track Airdrop"
                        className="track-crypto-heading"
                        delay={100}
                        duration={2.6}
                        ease="elastic.out(1,0.3)"
                        splitType="chars"
                        from={{ opacity: 0, y: 40 }}
                        to={{ opacity: 1, y: 0 }}
                        threshold={0.1}
                        rootMargin="-100px"
                        textAlign="center"
                    />

                <h1 className='real-time-heading'>
                    Real Time.
                </h1>
                <p className='info-text'>
                    Track crypto through a public api in real time. Visit the dashboard to do so!
                    </p>
                <div className='btn-flex'>
                    <Link to="/dashboard">
                    <Button text={"Dashboard"}/>
                    </Link>
                    <Button text={"Share"} />

                </div>
            </div>
            <div className='phone-container'>
                <motion.img src={iphone} alt="Phone" className='iphone' 
                initial={{ y: -10 }}
                animate={{ y: 10 }}
                transition={{ type:"smooth",duration: 2, repeat: Infinity, repeatType: "mirror" }}
                />
                <img src={gradient} alt="gradient" className='gradient' />

            </div>
        </div>
    </div>
  )
}

export default MainComponent
