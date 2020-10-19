import React from 'react';

import './special-projects.scss';

import kakvkino_illustration from 'images/special_project_kakvkino.svg';

export default function SpecialProjects() {
    return (
        <section id="special-projects" className="special-projects">
            <h2>
                Наши <br className="pc-hide"/>
                спецпроекты: 
            </h2>

            <div className="special-projects_projects">
                <div className="special-projects_projects_block">
                    <img src={ kakvkino_illustration } alt=""/>
                    <h3>
                        Первая в мире реклама <br/>
                        с возвратом бюджета!
                    </h3>
                    <p>
                        Рекламодатели становятся соинвесторами фильма и <br className="mobile-hide"/>
                        получают возврат рекламного бюджета
                    </p>
                    <a href="https://kakvkino.group" target="_blank">Подробнее</a>
                </div>
            </div>
        </section>
    );
}