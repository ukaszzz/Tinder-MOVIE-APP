import React, { useEffect, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import RecommendationService from '../../service/Recommendation.service';
import { ActionType } from '../../model/enums/ActionType';
import { SwipeDirection } from '../../model/enums/SwipeDirection';
import { Recommendation } from '../../model/Recommendation';
import { AwailableDirection } from '../../model/Direction';
import './cardBox.scss';

function CardBox() {
    const[recommendationsList, setRecommendationsList] = useState<Recommendation[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastDirection, setLastDirection] = useState<AwailableDirection>();
    const [lastMovie, setLastMovie] = useState<Boolean>(false);
    const [errorAlert, setErrorAlert] = useState<Boolean>(false);
    const itemEl = useRef(new Array())

    async function fetchData(){
        try {
            let req = await RecommendationService.getRecommendationData();
            setRecommendationsList(req.data);
            setCurrentIndex((req.data.length - 1));
        } catch (e) {
            setErrorAlert(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const updateCurrentIndex = (val:number) => {
        setCurrentIndex(val)
        if(val < 0) {
            setLastMovie(true)
        }
    }

    const swiped = async (direction: AwailableDirection, id:string, index:number) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
        const actionType = direction === SwipeDirection.LEFT  ? ActionType.ACCEPT : ActionType.REJECT
        await RecommendationService.acceptOrReject(id, actionType)
    }

    const swipe = async (dir: AwailableDirection) => {
        if (currentIndex >= 0 && currentIndex < recommendationsList.length) {
            await itemEl.current[currentIndex].swipe(dir);
        }
    }

    return (
        <div>
            { errorAlert ?
                   <Alert severity="error" variant="filled">
                       <AlertTitle>Error</AlertTitle>
                       Please try later!
                   </Alert> : (
            <div>
                <div className='cardBox'>
                    {recommendationsList.map((recommendation: Recommendation,index: number) => (
                        //@ts-ignore
                        <TinderCard
                            ref={(element) => itemEl.current[index] = element}
                            className='swipe'
                            key={recommendation.id}
                            onSwipe={(dir) => swiped(dir, recommendation.id, index)}>
                            <div>
                                <h3>{recommendation.title} ({recommendation.rating}/10)</h3>
                                <img src={`${recommendation.imageURL}`} alt={recommendation.title}/>
                                <p>{recommendation.summary}</p>
                            </div>
                        </TinderCard>
                    ))}
                    {lastMovie ? (
                        <h2 className='infoText'>
                            There is no movie left!
                        </h2>) : ''}
                </div>
                <div className="swipeButtons">
                    <Button variant="contained" color="success" startIcon={<DoneIcon />}
                            onClick={() => swipe('left')}>
                        Accept
                    </Button>
                    <Button variant="contained" color="error" endIcon={<CloseIcon />}
                            onClick={() => swipe('right')}>
                        Reject
                    </Button>
                </div>
            </div>
                )}
            { lastDirection ? (
                <h2 className={`infoText ${lastDirection === 'left' ? 'accepted' : 'rejected'}`}>
                    {lastDirection === 'left' ? 'Accepted': 'Rejected'}
                </h2> ) : ''}
        </div>
    )
}

export default CardBox