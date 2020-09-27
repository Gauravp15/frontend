import React from 'react';
import { gsap, Power1 } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '../static/atulkhola.svg';

class Header extends React.Component {

    componentDidMount() {
        gsap.registerPlugin(ScrollToPlugin);

    }

    scrollToTargets = target => {
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
                            <li className="navItem"><a onClick={() => this.scrollToTargets('#section0')}>About</a></li>
                            <li className="navItem"><a onClick={() => this.scrollToTargets('#section0')}>Work</a></li>
                            <li className="navItem"><a onClick={() => this.scrollToTargets('#section0')}>People</a></li>
                            <li className="navItem"><a onClick={() => this.scrollToTargets('#section0')}>Life</a></li>
                            <li className="navItem"><a onClick={() => this.scrollToTargets('#section6')}>Contact</a></li>
                        </ul>
                        <div className="downloadResume">
                            <a href="#" data-text="Download Resume">Download Resume</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;