import React from 'react';
import { gsap, Power1 } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '../static/atulkhola.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        gsap.registerPlugin(ScrollToPlugin);

    }

    scrollToTargets = (e, target) => {
        e.preventDefault();
        gsap.to(window, {
            duration: 1.5,
            ease: Power1.easeOut,
            scrollTo: {
                y: target
            }
        })
    }

    render() {
        return (
            <div className="header">
                <div className="containerRight">
                    <div className="headerWrapper">
                        <div className="logo">
                            <img src={logo} alt="Atul Khola" />
                        </div>
                        <ul className="navList">
                            <li className="navItem" /* data-menuanchor="about" */><a onClick={(e) => this.props.fullpageApi.moveTo('about')} href="#about">About</a></li>
                            <li className="navItem" /* data-menuanchor="work" */><a onClick={(e) => this.props.fullpageApi.moveTo('work')} href="#work">Work</a></li>
                            <li className="navItem" /* data-menuanchor="people" */><a onClick={(e) => this.props.fullpageApi.moveTo('people')} href="#people">People</a></li>
                            <li className="navItem" /* data-menuanchor="life" */><a onClick={(e) => this.props.fullpageApi.moveTo('life')} href="#life">Life</a></li>
                            <li className="navItem" /* data-menuanchor="contact" */><a onClick={(e) => this.props.fullpageApi.moveTo('contact')} href="#contact">Contact</a></li>
                        </ul>
                        <div className="downloadResume">
                            <a href="https://pixelandpump.com/wp-content/uploads/2020/10/Atul-Khola1.pdf" data-text="Download Resume" target="_blank" rel="noopener noreferrer"><span className="resumeText">Download Resume</span></a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;