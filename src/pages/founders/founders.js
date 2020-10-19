import React from 'react';

import Slider from 'features/slider';

import './founders.scss';

import illsutration from 'images/founders_illustration.svg';
import clients_0 from 'images/founders_clients_0.svg';
import clients_1 from 'images/founders_clients_1.svg';
import clients_mobile from 'images/founders_clients_mobile.svg';

export default function FoundersPage({ isMobile }) {
    return (
        <div id="founders-page" className="founders">

            <div className="founders_illustration">
                <img src={ illsutration } alt=""/>
            </div>

            <div className="founders_text">
                { !isMobile && <h1>Об основателе</h1> }

                <h2>Ирина Ларцева <span>Генеральный директор</span></h2>

                <div className="founders_text_group">
                    <h3>Образование:</h3>

                    <ul>
                        <li>
                            Высшая школа печати и медиаиндустрии <br/>
                            <span>(экономика и управление издательским делом)</span>
                        </li>
                        <li>
                            Executive MBA в бизнес-школе AMI <br/>
                            <span>(Создана основателями SSE Russia)</span>
                        </li>
                    </ul>
                </div>

                <div className="founders_text_group">
                    <h3>Выступления:</h3>

                    <ul>
                        <li>
                            Бизнес-конференция <br/>
                            «Эффект Мадонны: стратегия опережения <br/>
                            в подражательной экономике»
                        </li>
                        <li>
                            Что стоит за успехом запуска <br className="mobile-hide"/>
                            Бизнес ФМ? &nbsp; <br className="pc-hide"/>
                            <span>(Red Apple, 2011)</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="founders_clients">
                <h2>Клиенты:</h2>
                {
                    isMobile ? 
                    <img src={ clients_mobile } alt=""/> :
                    <Slider id="founders_clients-slider" uiColor="#E4716D">
                        <img src={ clients_0 } alt="Клиенты"/>
                        <img src={ clients_1 } alt="Клиенты"/>
                    </Slider>
                }
            </div>
        </div>
    );
}