import React from 'react';
/* import lottie from 'lottie-web'; */
import { gsap, TweenLite, Power1 } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { get, slice } from 'lodash-es';
import customFetch from '../utils/customFetch';
import ReactFullpage from '@fullpage/react-fullpage';
import Ticker from 'react-ticker';
/* Component imports */
import '../index.css';
import Header from './Header';
import Glitch from './Glitch';
import CaseStudy from './CaseStudy';
import Articles from './Articles';
import Interactions from './Interactions';
import Testimonial from './Testimonial';
import Insta from './Insta';
import Cta from './Cta';
import Icon from './Icon';
/* Method imports */
/* import { getTestimonials } from '../utils/apiCalls'; */
/* Doodle imports */
import bulb from '../static/bulb.svg';
import pen from '../static/pen.svg';
import colordrop from '../static/colordropper.svg';
import selection from '../static/selectionL.svg';
import chat from '../static/chat.svg';
/* import equation from '../static/equation.json'; */
import questionMark from '../static/questionMark.svg';
import triangle from '../static/triangle.svg';
import algeq from '../static/algeq.svg';
import cone from '../static/cone.svg';
import algeq2 from '../static/algeq2.svg';
import barbell from '../static/barbell.svg';
import rope from '../static/rope.svg';
import stroke2 from '../static/stroke2.svg';
import stroke3 from '../static/stroke3.svg';
import halo from '../static/halo.svg';
import pizza from '../static/pizza.svg';
import checkbox from '../static/checkbox.svg';
import hand from '../static/hand.svg';
import hearts from '../static/hearts.svg';
import puzzles from '../static/puzzles.svg';
import hi from '../static/hi.png';
import pointup from '../static/pointup.png';
/* Companies svg imports */
import curefit from '../static/curefit.svg';
import curefitn from '../static/curefitn.svg';
import medianet from '../static/medianet.svg';
import medianetn from '../static/medianetn.svg';
import toppr from '../static/toppr.svg';
import topprn from '../static/topprn.svg';
import jabong from '../static/jabong.svg';
import jabongn from '../static/jabongn.svg';
/* Social media svg imports */
import behance from '../static/behance.svg';
import medium from '../static/medium.svg';
import dribbble from '../static/dribbble.svg';
import linkedin from '../static/linkedin.svg';
import instagram from '../static/instagram.svg';
import scribble from '../static/strike.svg';
import twitter from '../static/twitter.svg';
/* Image imports */
/* import interactionImg from '../static/interaction.jpg'; */
import intro from '../static/atulk/intro.png';
import getintouch from '../static/atulk/getintouch.png';
import maths from '../static/atulk/maths.png';
import productivity from '../static/atulk/productivity3.png';
import liftmoods from '../static/atulk/liftmoods.png';
import equation1 from '../static/equation.png';
import instacta from '../static/instacta.png';
import behancecta from '../static/behancecta.png';
import dribbblecta from '../static/dribbblecta.png';
import mediumcta from '../static/mediumcta.png';
import hellocta from '../static/hellocta.png';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curefit: false,
            medianet: false,
            toppr: false,
            jabong: false,
            testimonials: [],
            articles: [],
            caseStudies: [],
            dribbbleShots: [],
            insta: [],
            isLoaderVisible: true,
            instaCta: false,
            mediumCta: false,
            dribbbleCta: false,
            behanceCta: false,
            helloCta: false
        }
        /* this.baseUrl = "http://localhost:8000/wp-json/wp/v2/"; */
        this.baseUrl = "https://pixelandpump.com/wp-json/wp/v2/";
        this.anim = '';
        this.revealRefs = React.createRef([]);
        this.revealRefs.current = [];
        this.sectionRight = React.createRef([]);
        this.sectionRight.current = [];
        this.sectionRefs = React.createRef([]);
        this.sectionRefs.current = [];
        this.leftElementRefs = React.createRef([]);
        this.leftElementRefs.current = [];
        this.rightElementRefs = React.createRef([]);
        this.rightElementRefs.current = [];
        this.dataScroll = React.createRef([]);
        this.dataScroll.current = [];
        this.highlightScroll = React.createRef([]);
        this.highlightScroll.current = [];
        this.csr = React.createRef();
        this.ctaPointer = React.createRef();
        this.ctaPointer.current = [];
        this.requestId = null;
    }

    componentDidMount() {
        this.getDribbbleShots();
        this.getCaseStudies();
        this.getArticles();
        this.getTestimonials();
        this.getInstaPics();
        gsap.registerPlugin(ScrollTrigger, TweenLite);

        let sections = gsap.utils.toArray(this.sectionRefs.current);
        let descriptions = gsap.utils.toArray(this.revealRefs.current);
        let sectionRight = gsap.utils.toArray(this.sectionRight.current);
        let dataScroll = gsap.utils.toArray(this.dataScroll.current);
        let highlightScroll = gsap.utils.toArray(this.highlightScroll.current);
        let leftElements = gsap.utils.toArray(this.leftElementRefs.current);
        let rightElements = gsap.utils.toArray(this.rightElementRefs.current);

        /* console.log('Section right', sectionRight); */

        gsap.set(sectionRight, { opacity: 0 });
        gsap.set(leftElements, { opacity: 0 });
        gsap.set(rightElements, { opacity: 0 });
        gsap.set(descriptions, { opacity: 0, y: 50 });
        gsap.set(dataScroll, { opacity: 0, y: 50 });
        //gsap.set(highlightScroll, { xPercent: 100 });

        window.addEventListener('mousemove', this.mouseMove);
        let navItems = document.querySelectorAll('.navItem');
        for (let i = 0; i < navItems.length; i++) {
            navItems[i].addEventListener('mouseenter', this.mouseHover);
            navItems[i].addEventListener('mouseleave', this.mouseHoverOut);
        }


        /* let proxy = { skew: 0 },
            skewSetter = gsap.quickSetter(sections, "skewY", "deg"), //fast
            clamp = gsap.utils.clamp(-5, 5); //don't let the skew go beyond 20 degrees 

        ScrollTrigger.create({
            onUpdate: (self) => {
                let skew = clamp(self.getVelocity() / -500);
                // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
                if (Math.abs(skew) > Math.abs(proxy.skew)) {
                    proxy.skew = skew;
                    gsap.to(proxy, { skew: 0, duration: 0.8, ease: Power1.easeIn, overwrite: true, onUpdate: () => skewSetter(proxy.skew) });
                }
            }
        }); */

        sectionRight.forEach((el, index) => {
            el.addEventListener('mousemove', evt => {
                let xPos = (evt.clientX / window.innerWidth) - 0.5,
                    yPos = (evt.clientY / window.innerHeight) - 0.5,
                    box = el;

                TweenLite.to(box, 0.6, {
                    rotationY: 20 * xPos,
                    rotationX: 20 * yPos,
                    ease: Power1.easeOut,
                    transformPerspective: 900,
                    transformOrigin: 'center'
                });
                this.leftElementRefs.current.forEach((el, index) => {
                    TweenLite.to(el, 0.6, {
                        rotationY: 40 * xPos,
                        rotationX: 40 * yPos,
                        translateX: 60 * yPos,
                        translateY: 60 * xPos,
                        transformPerspective: 1000,
                        transformOrigin: 'center'
                    });
                });
                this.rightElementRefs.current.forEach((el, index) => {
                    TweenLite.to(el, 0.6, {
                        rotationY: 40 * xPos,
                        rotationX: 40 * yPos,
                        translateX: 60 * yPos,
                        translateY: 60 * xPos,
                        transformPerspective: 1000,
                        transformOrigin: 'center'
                    });
                })
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isLoaderVisible !== prevProps.isLoaderVisible) {
            //play tween
            //console.log('Tl', this.timeline);
            this.activateScrollTrigger();
        }
    }

    mouseMove = e => {
        TweenLite.to(this.csr.current, .1, {
            x: e.pageX - 5,
            y: e.pageY - 7
        });

        this.ctaPointer.current.map((i, k) => {

            let mouseX = (i.getBoundingClientRect().left);
            let mouseY = (i.getBoundingClientRect().top);

            let radianDegrees = Math.atan2(e.pageX - mouseX, e.pageY - mouseY);
            let rotationDegrees = (radianDegrees * (180 / Math.PI) * -1) + 180;

            TweenLite.to(i, .1, {
                rotation: rotationDegrees + 70
            });
        });
    }

    mouseHover = e => {
        TweenLite.to(this.csr.current, .2, {
            scale: 3
        });
    }

    mouseHoverOut = e => {
        TweenLite.to(this.csr.current, .2, {
            scale: 1
        });
    }

    addToRefs = (el, type) => {
        switch (type) {
            case 'section':
                if (el && !this.sectionRefs.current.includes(el)) {
                    this.sectionRefs.current.push(el);
                }
                break;
            case 'sectionRight':
                if (el && !this.sectionRight.current.includes(el)) {
                    this.sectionRight.current.push(el);
                }
                break;
            case 'leftElement':
                if (el && !this.leftElementRefs.current.includes(el)) {
                    this.leftElementRefs.current.push(el);
                }
                break;
            case 'rightElement':
                if (el && !this.rightElementRefs.current.includes(el)) {
                    this.rightElementRefs.current.push(el);
                }
                break;
            case 'reveal':
                if (el && !this.revealRefs.current.includes(el)) {
                    this.revealRefs.current.push(el);
                }
                break;
            case 'dataScroll':
                if (el && !this.dataScroll.current.includes(el)) {
                    this.dataScroll.current.push(el);
                }
                break;
            case 'highlightScroll':
                if (el && !this.highlightScroll.current.includes(el)) {
                    this.highlightScroll.current.push(el);
                }
                break;
            case 'ctaPointer':
                if (el && !this.ctaPointer.current.includes(el)) {
                    this.ctaPointer.current.push(el);
                }
                break;
            default:
                if (el && !this.sectionRefs.current.includes(el)) {
                    this.sectionRefs.current.push(el);
                }
        }
    }

    activateScrollTrigger = () => {
        let sections = gsap.utils.toArray(this.sectionRefs.current);
        let descriptions = gsap.utils.toArray(this.revealRefs.current);
        let sectionRight = gsap.utils.toArray(this.sectionRight.current);
        let dataScroll = gsap.utils.toArray(this.dataScroll.current);
        let highlightScroll = gsap.utils.toArray(this.highlightScroll.current);
        let leftElements = gsap.utils.toArray(this.leftElementRefs.current);
        let rightElements = gsap.utils.toArray(this.rightElementRefs.current);

        /* sections.forEach((section, i) => {

            ScrollTrigger.create({
                trigger: section,
                pin: true,
                scrub: 0.5
            });
        }); */

        sectionRight.forEach((sr, i) => {
            gsap.to(sr, {
                autoAlpha: 1,
                duration: 1,
                ease: Power1.easeIn
            });
        });

        leftElements.forEach((le, i) => {
            gsap.to(leftElements, {
                autoAlpha: 1,
                duration: 1,
                delay: 1,
                ease: Power1.easeIn,
            });
        });

        rightElements.forEach((re, i) => {
            gsap.to(rightElements, {
                autoAlpha: 1,
                duration: 1,
                delay: 2,
                ease: Power1.easeIn
            });
        });

        descriptions.forEach((desc, i) => {
            gsap.to(descriptions, {
                autoAlpha: 1,
                duration: 1,
                delay: 3,
                y: 0,
                ease: Power1.easeIn
            });
        });

        dataScroll.forEach((desc, i) => {
            gsap.to(dataScroll, {
                autoAlpha: 1,
                duration: 1,
                delay: 3.5,
                y: 0,
                ease: Power1.easeIn
            });
        });

        /* highlightScroll.forEach((hs, i) => {
            gsap.to(highlightScroll, {
                autoAlpha: 1,
                duration: 1,
                delay: 3.5,
                y: 0,
                ease: Power1.easeIn
            });
            gsap.to(hs, {
                xPercent: -100,
                duration: 20,
                delay: 5,
                ease: "none",
                modifiers: {
                    xPercent: gsap.utils.unitize(x => parseFloat(x) % 100)
                },
                repeat: -1
            });
        }); */


        //console.log(this.sectionRefs.current);
    }

    goToSection = (i, anim) => {
        gsap.to(window, {
            scrollTo: { y: i, autoKill: false },
            duration: 1.4,
            overwrite: true
        });
        if (anim) {
            anim.restart();
        }
    }

    getDribbbleShots = () => {
        let dribbbleApiCall = customFetch(this.baseUrl + 'dribbble_shots?_embed&order=desc');

        let dribbbleShots = [];
        dribbbleApiCall.then(res => {
            if (get(res, "status") === 200) {
                get(res, "data", []).map((i, k) => {
                    let shotData = {};
                    shotData["animated"] = get(i, "content.rendered", "");
                    shotData["thumbnail"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    shotData["url"] = get(i, "shot_linkout", "");
                    shotData["title"] = get(i, "title.rendered", "");
                    dribbbleShots.push(shotData);
                });
                this.setState({
                    dribbbleShots
                });
            }
        })
    }

    getTestimonials = () => {
        let testimonialApiCall = customFetch(
            this.baseUrl + 'testimonials?_embed&per_page=30&order=desc',
            "GET"
        );

        let testimonials = [];
        testimonialApiCall.then(res => {
            if (get(res, "status") === 200) {
                get(res, "data", []).map((i, k) => {
                    let testimonialData = {};
                    testimonialData["description"] = get(i, "content.rendered", "");
                    testimonialData["title"] = get(i, "title.rendered", "");
                    testimonialData["authorCompany"] = get(i, "acf.company_name", "");
                    testimonialData["authorName"] = get(i, "acf.testimonial_author", "");
                    testimonialData["authorPosition"] = get(i, "acf.author_position", "");
                    testimonialData["link"] = get(i, "acf.profile_link", "");
                    testimonialData["authorImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    testimonials.push(testimonialData);
                    testimonials.reverse();
                });
                this.setState({
                    testimonials
                })
            }
        }).catch(e => {
            console.log('Testimonials', e);
        });
    }

    getCaseStudies = () => {
        let csApiCall = customFetch(
            this.baseUrl + 'case_studies?_embed&order=desc',
            "GET"
        );

        let caseStudies = [];
        csApiCall.then(res => {
            if (get(res, "status") === 200) {
                get(res, "data", []).map((i, k) => {
                    let csData = {};
                    csData["description"] = get(i, "content.rendered", "");
                    csData["title"] = get(i, "title.rendered", "");
                    csData["linkOut"] = get(i, "acf.case_study_linkout", "");
                    csData["bgImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    caseStudies.push(csData);
                    caseStudies.reverse();
                });
                this.setState({
                    caseStudies
                })
            }
        }).catch(e => {
            console.log('Case Studies', e);
        });
    }

    getArticles = () => {
        let articlesApiCall = customFetch(
            this.baseUrl + 'articles?_embed',
            "GET"
        );

        let articles = [];
        articlesApiCall.then(res => {
            if (get(res, "status", 200) === 200) {
                get(res, "data", []).map((i, k) => {
                    let articlesData = {};
                    articlesData["description"] = get(i, "content.rendered", "");
                    articlesData["title"] = get(i, "title.rendered", "");
                    articlesData["linkOut"] = get(i, "acf.article_linkout", "");
                    articlesData["bgImg"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    articles.push(articlesData);
                    articles.reverse();
                });
                this.setState({
                    articles
                })
            }
        }).catch(e => {
            console.log('Artices', e);
        });
    }

    getInstaPics = () => {
        let instaApiCall = customFetch(
            this.baseUrl + 'insta?_embed&per_page=20&order=desc',
            "GET"
        );

        let insta = [];
        instaApiCall.then(res => {
            if (get(res, "status", 200) === 200) {
                get(res, "data", []).map((i, k) => {
                    let instaData = {};
                    instaData["title"] = get(i, "title.rendered", "");
                    instaData["url"] = get(i, "acf.insta_linkout", "");
                    instaData["thumbnail"] = get(i, "_embedded.wp:featuredmedia.0.source_url", "");
                    insta.push(instaData);
                    insta.reverse();
                });
                this.setState({
                    insta
                })
            }
        }).catch(e => {
            console.log('Artices', e);
        });
    }

    toggleBrandState = (brandName) => {
        if (brandName === 'curefit') {
            this.setState({
                curefit: !this.state.curefit
            });
        } else if (brandName === 'medianet') {
            this.setState({
                medianet: !this.state.medianet
            });
        } else if (brandName === 'toppr') {
            this.setState({
                toppr: !this.state.toppr
            });
        } else {
            this.setState({
                jabong: !this.state.jabong
            });
        }
    }

    toggleCtaState = type => {
        switch (type) {
            case 'insta':
                this.setState({
                    instaCta: !this.state.instaCta
                });
                break;
            case 'behance':
                this.setState({
                    behanceCta: !this.state.behanceCta
                });
                break;
            case 'dribbble':
                this.setState({
                    dribbbleCta: !this.state.dribbbleCta
                });
                break;
            case 'medium':
                this.setState({
                    mediumCta: !this.state.mediumCta
                });
                break;
            case 'hello':
                this.setState({
                    helloCta: !this.state.helloCta
                });
                break;
            default:
            case 'insta':
                this.setState({
                    instaCta: !this.state.instaCta
                });
        }
    }


    render() {
        let dribbbleTopList = slice(this.state.dribbbleShots, 0, this.state.dribbbleShots.length / 2),
            dribbbleBottomList = slice(this.state.dribbbleShots, this.state.dribbbleShots.length / 2, this.state.dribbbleShots.length);

        let options = {
            sectionClassName: 'section',
            arrowNavigation: false,
            navigation: false,
            fixedElements: '.header',
            lockAnchors: true,
            normalScrollElements: '.testiDescriptionWrapper'
        };

        return (
            <div className="main">
                <div className="csr" ref={this.csr}>
                    <svg height="30" width="30">
                        <circle cx="15" cy="15" r="12" strokeWidth="0"></circle>
                    </svg>
                </div>
                {/* Intro section */}
                <ReactFullpage
                    licenseKey={'FC6B124C-C6764B89-B7AC3D1E-0A9B9421'}
                    render={({ state, fullpageApi }) => (<ReactFullpage.Wrapper>
                        {/* Header */}
                        <Header fullpageApi={fullpageApi} />
                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }} data-anchor="about">
                            <div className="containerRight fullHeight">
                                <div className="sectionWrapper fullHeight">
                                    <div className="sectionLeft">
                                        <span className="introTitle" ref={(e) => { this.addToRefs(e, 'reveal') }}>Hello, I am Atul Khola</span>
                                        <p className="introDescription" ref={(e) => { this.addToRefs(e, 'reveal') }}>a product designer with passion for human centered design that empowers people &amp; communities.</p>
                                    </div>
                                    <div className="sectionRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                                        <span className="bulb" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={bulb} alt="bulb" /></span>
                                        <span className="pen" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={pen} alt="pen" /></span>
                                        <span className="colordrop" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={colordrop} alt="colordrop" /></span>
                                        <span className="selection" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={selection} alt="selection" /></span>
                                        <span className="chat" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={chat} alt="chat" /></span>
                                        <div className="atulImg">
                                            <Glitch
                                                imagePath={intro}
                                            />
                                            {/* <img src={intro} alt="Atul Khola" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="highlights" ref={(e) => { this.addToRefs(e, 'dataScroll') }}>
                                <div className="skillsBlock">
                                    <span className="highlightTitle skillsTitle">my skill set</span>
                                    <Ticker speed={7}>
                                        {() => (<ul className="highlightList highlightScroll" ref={(e) => { this.addToRefs(e, 'highlightScroll') }}>
                                            <li className="highlightItem">UI/UX Design</li>
                                            <li className="highlightItem">Interaction Design</li>
                                            <li className="highlightItem">Motion design</li>
                                            <li className="highlightItem">Wireframing</li>
                                            <li className="highlightItem">Information Architecture</li>
                                            <li className="highlightItem">Rapid Prototyping</li>
                                            <li className="highlightItem">User Research</li>
                                            <li className="highlightItem">Conceptualizing</li>
                                            <li className="highlightItem">Storytelling</li>
                                            <li className="highlightItem">Design Thought Leadership</li>
                                            <li className="highlightItem">Mentoring</li>
                                            <li className="highlightItem">Balancing User &amp; Business Goals</li>
                                            <li className="highlightItem">Self-Starting</li>
                                        </ul>
                                        )}
                                    </Ticker>
                                </div>
                            </div>
                        </section>

                        {/* Second section */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                            <div className="containerRight fullHeight">
                                <div className="sectionWrapper fullHeight">
                                    <div className="sectionLeft">
                                        <p className="introDescription" ref={(e) => { this.addToRefs(e, 'reveal') }}>I am not great at maths but one equation I never get wrong</p>
                                        <div className="equation" ref={(e) => { this.addToRefs(e, 'reveal') }}>
                                            <img src={equation1} alt="Equation" />
                                        </div>
                                    </div>
                                    <div className="sectionRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                                        <span className="questionMark" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={questionMark} alt="questionMark" /></span>
                                        <span className="questionMark1" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={questionMark} alt="questionMark" /></span>
                                        <span className="questionMark2"><img src={questionMark} alt="questionMark" /></span>
                                        <span className="triangle" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={triangle} alt="triangle" /></span>
                                        <span className="algeq" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={algeq} alt="algeq" /></span>
                                        <span className="cone" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={cone} alt="cone" /></span>
                                        <span className="algeq2" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={algeq2} alt="algeq2" /></span>
                                        <div className="atulImg">
                                            <Glitch
                                                imagePath={maths}
                                            />
                                            {/* <img src={maths} alt="Atul Khola - Not good at maths" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="highlights" ref={(e) => { this.addToRefs(e, 'dataScroll') }}>
                                <div className="skillsBlock">
                                    <span className="highlightTitle skillsTitle">my tool box</span>
                                    <Ticker speed={7}>
                                        {() => (
                                            <ul className="highlightList highlightScroll" ref={(e) => { this.addToRefs(e, 'highlightScroll') }}>
                                                <li className="highlightItem">Sketch</li>
                                                <li className="highlightItem">After Effects</li>
                                                <li className="highlightItem">Principle</li>
                                                <li className="highlightItem">Lottie</li>
                                                <li className="highlightItem">Invision</li>
                                                <li className="highlightItem">Abstract</li>
                                                <li className="highlightItem">Lookback</li>
                                                <li className="highlightItem">Lucidchart</li>
                                                <li className="highlightItem">Keynote</li>
                                                <li className="highlightItem">Photoshop</li>
                                                <li className="highlightItem">Illustrator</li>
                                                <li className="highlightItem">Indesign</li>
                                                <li className="highlightItem">Trello</li>
                                            </ul>
                                        )}
                                    </Ticker>
                                </div>
                            </div>
                        </section>

                        {/* Third section */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                            <div className="containerRight fullHeight">
                                <div className="sectionWrapper fullHeight">
                                    <div className="sectionLeft">
                                        <span className="introTitle" ref={(e) => { this.addToRefs(e, 'reveal') }}>I take my fitness seriously, </span>
                                        <p className="introDescription" ref={(e) => { this.addToRefs(e, 'reveal') }}>to take my productivity and job performance even more seriously.</p>
                                    </div>
                                    <div className="sectionRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                                        <span className="barbell" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={barbell} alt="barbell" /></span>
                                        <span className="rope" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={rope} alt="rope" /></span>
                                        <span className="stroke2" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={stroke3} alt="stroke2" /></span>
                                        <span className="stroke3" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={stroke2} alt="stroke3" /></span>
                                        <div className="atulImg">
                                            <Glitch
                                                imagePath={productivity}
                                                className={"gym"}
                                            />
                                            {/* <img src={productivity} alt="Atul Khola - Productivity" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="highlights">
                                <div className="containerRight">
                                    <span className="highlightTitle">work places</span>
                                    <ul className="highlightList">
                                        <li className="highlightItem companyItem" onMouseEnter={() => this.toggleBrandState('curefit')} onMouseLeave={() => this.toggleBrandState('curefit')}><a href="https://www.cure.fit/" target="_blank" rel="noopener noreferrer"><img src={this.state.curefit ? curefit : curefitn} alt="Cure Fit" /></a></li>
                                        <li className="highlightItem companyItem" onMouseEnter={() => this.toggleBrandState('medianet')} onMouseLeave={() => this.toggleBrandState('medianet')}><a href="https://www.media.net/" target="_blank" rel="noopener noreferrer"><img src={this.state.medianet ? medianet : medianetn} alt="Media.net" /></a></li>
                                        <li className="highlightItem companyItem" onMouseEnter={() => this.toggleBrandState('toppr')} onMouseLeave={() => this.toggleBrandState('toppr')}><a href="https://www.toppr.com/" target="_blank" rel="noopener noreferrer"><img src={this.state.toppr ? toppr : topprn} alt="Toppr" /></a></li>
                                        <li className="highlightItem companyItem" onMouseEnter={() => this.toggleBrandState('jabong')} onMouseLeave={() => this.toggleBrandState('jabong')}><a href="https://www.myntra.com/" target="_blank" rel="noopener noreferrer"><img src={this.state.jabong ? jabong : jabongn} alt="Jabong" /></a></li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Fourth section */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                            <div className="containerRight fullHeight">
                                <div className="sectionWrapper fullHeight">
                                    <div className="sectionLeft">
                                        <span className="introTitle" ref={(e) => { this.addToRefs(e, 'reveal') }}>Apart from lifting weights, I also lift moods with</span>
                                        <p className="introDescription" ref={(e) => { this.addToRefs(e, 'reveal') }}>Surprise PIZZAS for the team. Le Pizza fairy</p>
                                    </div>
                                    <div className="sectionRight liftMoodsRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                                        <span className="halo" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={halo} alt="halo" /></span>
                                        <span className="pizza1" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={pizza} alt="pizza" /></span>
                                        <span className="pizza2" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={pizza} alt="pizza" /></span>
                                        <span className="pizza3" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={pizza} alt="pizza" /></span>
                                        <span className="pizza4" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={pizza} alt="pizza" /></span>
                                        <div className="atulImg">
                                            <Glitch
                                                imagePath={liftmoods}
                                            />
                                            {/* <img src={liftmoods} alt="Atul Khola - Surprise Pizzas" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Case studies */}

                        <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }} data-anchor="work">
                            <div className="containerRight">
                                <div className="titleWrapper">
                                    <h2 className="sectionTitle darkText">Case Studies</h2>
                                    <div className="ctaWrapper" onMouseEnter={() => this.toggleCtaState('behance')} onMouseLeave={() => this.toggleCtaState('behance')}>
                                        <Cta
                                            ctaText={"SEE THEM ON BEHANCE"}
                                            linkOut={"https://www.behance.net/atulkhola"}
                                            mode="dark"
                                            className="ctaText"
                                            imgSrc={behancecta}
                                        />
                                        <span className="ctaArrow darkText" ref={(e) => { this.addToRefs(e, 'ctaPointer') }}><img src={this.state.behanceCta ? hi : pointup} alt={this.state.behanceCta ? 'Click' : 'Click here'} />{/* <Icon icon={"arrow-right2"} size={20} /> */}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dataWrapper dataHighlightScroll">
                                {this.state.caseStudies.map((i, k) => {
                                    return (
                                        <CaseStudy
                                            key={`cs-${k}`}
                                            title={i.title}
                                            description={i.description}
                                            linkOut={i.linkOut}
                                            bgImg={i.bgImg}
                                            mode="dark"
                                        />
                                    )
                                })}
                                <div className="mr20"></div>
                            </div>
                        </section>

                        {/* Articles */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                            <div className="containerRight">
                                <div className="titleWrapper">
                                    <h2 className="sectionTitle">Articles</h2>
                                    <div className="ctaWrapper" onMouseEnter={() => this.toggleCtaState('medium')} onMouseLeave={() => this.toggleCtaState('medium')}>
                                        <Cta
                                            ctaText={"SEE THEM ON MEDIUM"}
                                            linkOut={"https://www.medium.com/@atulkhola"}
                                            mode="light"
                                            className="ctaText"
                                            imgSrc={mediumcta}
                                        />
                                        <span className="ctaArrow" ref={(e) => { this.addToRefs(e, 'ctaPointer') }}><img src={this.state.mediumCta ? hi : pointup} alt={this.state.mediumCta ? 'Click' : 'Click here'} />{/* <Icon icon={"arrow-right2"} size={20} /> */}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dataWrapper dataHighlightScroll">
                                {this.state.articles.map((i, k) => {
                                    return (
                                        <Articles
                                            key={`articles-${k}`}
                                            title={i.title}
                                            description={i.description}
                                            linkOut={i.linkOut}
                                            bgImg={i.bgImg}
                                            mode="dark"
                                        />
                                    )
                                })}
                                <div className="mr20"></div>
                            </div>
                        </section>

                        {/* Interactions */}

                        <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                            <div className="containerRight">
                                <div className="titleWrapper">
                                    <h2 className="sectionTitle darkText">Interactions</h2>
                                    <div className="ctaWrapper" onMouseEnter={() => this.toggleCtaState('dribbble')} onMouseLeave={() => this.toggleCtaState('dribbble')}>
                                        <Cta
                                            ctaText={"SEE ON DRIBBBLE"}
                                            linkOut={"https://dribbble.com/atulkhola"}
                                            mode="dark"
                                            className="ctaText"
                                            imgSrc={dribbblecta}
                                        />
                                        <span className="ctaArrow darkText" ref={(e) => { this.addToRefs(e, 'ctaPointer') }}><img src={this.state.dribbbleCta ? hi : pointup} alt={this.state.dribbbleCta ? 'Click' : 'Click here'} />{/* <Icon icon={"arrow-right2"} size={20} /> */}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="dataWrapper dblScroll">
                                <div className="topIntList">
                                    {
                                        dribbbleTopList.map((i, k) => {
                                            return (
                                                <Interactions
                                                    key={i.title + k}
                                                    intImg={i.thumbnail}
                                                    intImgH={i.animated}
                                                    title={i.title}
                                                    linkOut={i.url}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <div className="bottomIntList">
                                    {
                                        dribbbleBottomList.map((i, k) => {
                                            return (
                                                <Interactions
                                                    key={i.title + k}
                                                    intImg={i.thumbnail}
                                                    intImgH={i.animated}
                                                    title={i.title}
                                                    linkOut={i.url}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>

                        {/* Testimonials */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }} data-anchor="people">
                            <div className="containerRight">
                                <div className="titleWrapper blockWrapper">
                                    <span className="introTitle">The best part about the job</span>
                                    <h2 className="sectionTitle">people ❤️</h2>
                                </div>
                            </div>
                            <div className="dataWrapper dataHighlightScroll">
                                {this.state.testimonials.map((i, k) => {
                                    return (
                                        <Testimonial
                                            key={`testimonial-` + k}
                                            title={i.title}
                                            description={i.description}
                                            authorName={i.authorName}
                                            authorPosition={i.authorPosition}
                                            authorCompany={i.authorCompany}
                                            linkOut={i.link}
                                            authorImg={i.authorImg}
                                            mode="dark"
                                        />
                                    )
                                })}
                                <div className="mr20"></div>
                            </div>
                        </section>

                        {/* Instagram */}

                        <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }} data-anchor="life">
                            <div className="containerRight dFlex">
                                <div className="titleWrapper blockWrapper">
                                    <span className="introTitle darkText">&amp; there's so much more to life than</span>
                                    <h2 className="sectionTitle darkText">just work ✨</h2>
                                </div>
                                <div className="ctaWrapper" onMouseEnter={() => this.toggleCtaState('insta')} onMouseLeave={() => this.toggleCtaState('insta')}>
                                    <Cta
                                        ctaText={"SEE THEM ON INSTAGRAM"}
                                        linkOut={"https://www.instagram.com/pixelandpump"}
                                        mode="dark"
                                        className="ctaText"
                                        imgSrc={instacta}
                                    />
                                    <span className="ctaArrow darkText" ref={(e) => { this.addToRefs(e, 'ctaPointer') }}><img src={this.state.instaCta ? hi : pointup} alt={this.state.instaCta ? 'Click' : 'Click here'} />{/* <Icon icon={"arrow-right2"} size={20} /> */}</span>
                                </div>
                            </div>
                            <div className="dataWrapper dataHighlightScroll">
                                <div className="topIntList instaList">
                                    {
                                        this.state.insta.map((i, k) => {
                                            return (
                                                <Insta
                                                    key={i.title + k}
                                                    instaImg={i.thumbnail}
                                                    title={i.title}
                                                    linkOut={i.url}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>

                        {/* Contact */}

                        <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }} data-anchor="contact">
                            <div className="containerRight fullHeight">
                                <div className="sectionWrapper fullHeight">
                                    <div className="sectionLeft fullHeight">
                                        <div className="titleWrapper blockWrapper helloWrapper">
                                            <span className="introTitle">Let's connect!</span>
                                            <h2 className="sectionTitle bottomSectionTitle">Your company, a runway of brainstormed ideas, a hell of a <span className="textScribble">coffee<span className="scribble"><img src={scribble} alt="scribble" /></span></span> beer and gateway to spectacular. </h2>
                                        </div>
                                        <div className="ctaWrapper" onMouseEnter={() => this.toggleCtaState('hello')} onMouseLeave={() => this.toggleCtaState('hello')}>
                                            <Cta
                                                ctaText={"SEND ME A HELLO"}
                                                linkOut={"mailto:atul@designdrug.co"}
                                                className="ctaText"
                                                imgSrc={hellocta}
                                            />
                                            <span className="ctaArrow darkText" ref={(e) => { this.addToRefs(e, 'ctaPointer') }}><img src={this.state.helloCta ? hi : pointup} alt={this.state.helloCta ? 'Click' : 'Click here'} /></span>
                                        </div>
                                        <div className="contactBottom">
                                            <ul className="socialList">
                                                <li><a href="https://www.behance.net/atulkhola" target="_blank"><img src={behance} alt="Behance" /></a></li>
                                                <li><a href="https://medium.com/@atulkhola" target="_blank" rel="noopener noreferrer"><img src={medium} alt="Medium" /></a></li>
                                                <li><a href="https://dribbble.com/atulkhola" target="_blank" rel="noopener noreferrer"><img src={dribbble} alt="Dribbble" /></a></li>
                                                <li><a href="https://www.linkedin.com/in/atulkhola/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a></li>
                                                <li><a href="https://www.instagram.com/pixelandpump" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a></li>
                                                <li><a href="https://twitter.com/pixelandpump" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter" /></a></li>
                                            </ul>
                                            <span className="madeWithLove">made with ❤️</span>
                                        </div>
                                    </div>
                                    <div className="sectionRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                                        {/* <span className="checkbox" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={checkbox} alt="checkbox" /></span> */}
                                        <span className="hand" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={hand} alt="hand" /></span>
                                        <span className="hearts" ref={(e) => { this.addToRefs(e, 'rightElement') }}><img src={hearts} alt="hearts" /></span>
                                        {/* <span className="puzzles" ref={(e) => { this.addToRefs(e, 'leftElement') }}><img src={puzzles} alt="puzzles" /></span> */}
                                        <div className="atulImg">
                                            <Glitch
                                                imagePath={getintouch}
                                            />
                                            {/* <img src={getintouch} alt="Atul Khola - Get in touch" /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </ReactFullpage.Wrapper>)}
                    {...options}
                />
            </div>
        )
    }
}

export default Main;