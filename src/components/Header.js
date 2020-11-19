import React from 'react';
import { gsap, Power1, TimelineMax, Power4 } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import logo from '../static/atulkhola.svg';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.menuTrigger = React.createRef();
        this.menuTriggerTop = React.createRef();
        this.menuTriggerBottom = React.createRef();
        this.closeTrigger = React.createRef();
        this.closeTriggerLeft = React.createRef();
        this.closeTriggerRight = React.createRef();
        this.mobNavList = React.createRef();
        this.menuBgTop = React.createRef();
        this.menuBgBottom = React.createRef();
        this.menuBgMiddle = React.createRef();
        this.menuInnerContainer = React.createRef();
        this.mobDownload = React.createRef();

        this.tlOpen = new TimelineMax({paused: true});
        this.tlClose = new TimelineMax({paused: true});
    }

    componentDidMount() {
        gsap.registerPlugin(ScrollToPlugin, TimelineMax);

        //Open Timeline
        this.tlOpen.add('preOpen')
                .to(this.menuTriggerTop.current, 0.4, {
                    x: "+80px",
                    delay: 0.1,
                    ease: Power4.easeIn,
                    onComplete: () => {
                        this.closeTrigger.current.style.zIndex = 25
                    }
                }, 'preOpen')
                .to(this.menuTriggerBottom.current, 0.4, {
                    x: "-80px",
                    delay: 0.2,
                    ease: Power4.easeIn,
                    onComplete: () => {
                        this.menuTrigger.current.style.visibility = 'hidden';
                        this.menuInnerContainer.current.style.visibility = 'visible';
                        this.mobDownload.current.style.visibility = 'visible';
                    }
                }, 'preOpen')
                .add('open', '-=0.4')
                .to(this.menuBgTop.current, 0.8, {
                    y: '13%',
                    ease: Power4.easeInOut
                }, 'open')
                .to(this.menuBgMiddle.current, 0.8, {
                    scaleY: 1,
                    ease: Power4.easeInOut
                }, 'open')
                .to(this.menuBgBottom.current, 0.8, {
                    y: '-114%',
                    ease: Power4.easeInOut
                }, 'open')
                .fromTo(this.mobNavList.current, 0.6, {
                    y: 30, 
                    opacity: 0, 
                    visibility: 'hidden'
                }, {
                    y: 0,
                    opacity: 1,
                    visibility: 'visible',
                    ease: Power4.easeOut
                  }, "-=0.2")
                .add('preClose', '-=0.8')
                .to(this.closeTriggerLeft.current, 0.8, {
                    x: '-=100px',
                    y: '+=100px',
                    delay: 0.2,
                    ease: Power4.easeOut
                }, 'preClose')
                .to(this.closeTriggerRight.current, 0.8, {
                    x: "+=100px",
                    y: "+=100px",
                    delay: 0.2,
                    ease: Power4.easeOut
                  }, "preClose");
            
        //Close Timeline
        this.tlClose.add('close')
                .to(this.menuBgTop.current, 0.2, {
                    ease: Power4.easeInOut,
                    onComplete: () => {
                        this.closeTrigger.current.style.zIndex= 5;
                        this.menuTrigger.current.style.visibility = 'visible';
                        this.mobDownload.current.style.visibility = 'hidden';
                    }
                }, 'close')
                .to(this.menuTriggerBottom.current, 0.2, {
                    ease: Power4.easeInOut
                }, 'close')
                .to(this.mobNavList.current, 0.6, {
                    y: 20,
                    opacity: 0,
                    ease: Power4.easeOut,
                    onComplete: () => {
                        this.mobNavList.current.style.visibility = 'hidden';
                        this.menuInnerContainer.current.style.visibility = 'hidden';
                    }
                }, 'close')
                .to(this.menuBgTop.current, 0.8, {
                    y: "-113%",
                    ease: Power4.easeInOut
                  }, "close", "+=0.2")
                  .to(this.menuBgMiddle.current, 0.8, {
                    scaleY: 0,
                    ease: Power4.easeInOut
                  }, "close", "+=0.2")
                  .to(this.menuBgBottom.current, 0.8, {
                    y: "23%",
                    ease: Power4.easeInOut,
                  }, "close", "+=0.2")
                  .to(this.closeTriggerLeft.current, 0.2, {
                    x: "+=100px",
                    y: "-=100px",
                    ease: Power4.easeIn
                  }, "close")
                  .to(this.closeTriggerRight.current, 0.2, {
                    x: "-=100px",
                    y: "-=100px",
                    delay: 0.1,
                    ease: Power4.easeIn
                  }, "close")
                  .to(this.menuTriggerTop.current, 1, {
                    x: "0px",
                    delay: 0.2,
                    ease: Power4.easeOut
                  }, "close")
                  .to(this.menuTriggerBottom.current, 1, {
                    x: "0px",
                    delay: 0.1,
                    ease: Power4.easeOut
                  }, "close");
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
                            <a href="https://pixelandpump.com/wp-content/uploads/2020/10/Atul-Khola1.pdf" data-text="Download Resume" target="_blank" rel="noopener noreferrer" download><span className="resumeText">Download Resume</span></a>
                        </div>
                        <div className="mobNav">
                            <div className="menuTrigger" ref={this.menuTrigger} onClick={() => {
                                if(this.tlOpen.progress() < 1){
                                    this.tlOpen.play();
                                }else{
                                    this.tlOpen.restart();
                                }
                            }}>
                                <span className="menuTriggerBar top" ref={this.menuTriggerTop}></span>
                                <span className="menuTriggerBar bottom" ref={this.menuTriggerBottom}></span>
                            </div>
                            <div className="closeTrigger" ref={this.closeTrigger} onClick={() => {
                                if(this.tlClose.progress() < 1){
                                    this.tlClose.play();
                                }else{
                                    this.tlClose.restart();
                                }
                            }}>
                                <span className="closeTriggerBar left" ref={this.closeTriggerLeft}></span>
                                <span className="closeTriggerBar right" ref={this.closeTriggerRight}></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menuInnerContainer" ref={this.menuInnerContainer}>
                        <span className="menuBg top" ref={this.menuBgTop}></span>
                        <span className="menuBg middle" ref={this.menuBgMiddle}></span>
                        <span className="menuBg bottom" ref={this.menuBgBottom}></span>
                        <div className="menuContainer" ref={this.menuContainer}>
                            <ul className="mobNavList" ref={this.mobNavList}>
                                <li className="mobNavItem" /* data-menuanchor="about" */><a onClick={(e) => {this.props.fullpageApi.moveTo('about'); this.tlClose.play();}} href="#about">About</a></li>
                                <li className="mobNavItem" /* data-menuanchor="work" */><a onClick={(e) => {this.props.fullpageApi.moveTo('work'); this.tlClose.play();}} href="#work">Work</a></li>
                                <li className="mobNavItem" /* data-menuanchor="people" */><a onClick={(e) => {this.props.fullpageApi.moveTo('people'); this.tlClose.play();}} href="#people">People</a></li>
                                <li className="mobNavItem" /* data-menuanchor="life" */><a onClick={(e) => {this.props.fullpageApi.moveTo('life'); this.tlClose.play();}} href="#life">Life</a></li>
                                <li className="mobNavItem" /* data-menuanchor="contact" */><a onClick={(e) => {this.props.fullpageApi.moveTo('contact'); this.tlClose.play();}} href="#contact">Contact</a></li>
                            </ul>
                            <div className="mobDownloadResume" ref={this.mobDownload}>
                                <a href="https://pixelandpump.com/wp-content/uploads/2020/10/Atul-Khola1.pdf" data-text="Download Resume" target="_blank" rel="noopener noreferrer" download><span className="resumeText">Download Resume</span></a>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default Header;