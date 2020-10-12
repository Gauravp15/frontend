import React from 'react';
import lottie from 'lottie-web';
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
import equation from '../static/equation.json';
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
/* Companies svg imports */
import curefit from '../static/curefit.svg';
import medianet from '../static/medianet.svg';
import toppr from '../static/toppr.svg';
import jabong from '../static/jabong.svg';
/* Social media svg imports */
import behance from '../static/behance.svg';
import medium from '../static/medium.svg';
import dribbble from '../static/dribbble.svg';
import linkedin from '../static/linkedin.svg';
import instagram from '../static/instagram.svg';
import scribble from '../static/scribble.svg';
/* Image imports */
import interactionImg from '../static/interaction.jpg';
import intro from '../static/atulk/intro.png';
import getintouch from '../static/atulk/getintouch.png';
import maths from '../static/atulk/maths.png';
import productivity from '../static/atulk/productivity1.png';
import liftmoods from '../static/atulk/liftmoods.png';
import equation1 from '../static/equation.png';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testimonials: [],
            articles: [],
            caseStudies: [],
            dribbbleShots: [],
            insta: [],
            isLoaderVisible: true
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

        console.log('Section right', sectionRight);

        gsap.set(sectionRight, { opacity: 0 });
        gsap.set(leftElements, { opacity: 0 });
        gsap.set(rightElements, { opacity: 0 });
        gsap.set(descriptions, { opacity: 0, y: 50 });
        gsap.set(dataScroll, { opacity: 0, y: 50 });
        gsap.set(highlightScroll, { xPercent: 100 });


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


    render() {
        let dribbbleTopList = slice(this.state.dribbbleShots, 0, this.state.dribbbleShots.length / 2),
            dribbbleBottomList = slice(this.state.dribbbleShots, this.state.dribbbleShots.length / 2, this.state.dribbbleShots.length);

        let options = {
            sectionClassName: 'section',
            /* anchors: ['section0', 'section1', 'section2', 'section3', 'section4', 'section5', "section6", 'section7', 'section8', 'section9'], */
            arrowNavigation: false,
            navigation: false,
            lockAnchors: true
        };

        let compBody = (<ReactFullpage.Wrapper>
            <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
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
                                <li className="highlightItem">User experience design</li>
                                <li className="highlightItem">User Interface design</li>
                                <li className="highlightItem">Interaction design</li>
                                <li className="highlightItem">Wireframing, Information architecture &amp; rapid prototyping</li>
                                <li className="highlightItem">Planning &amp; Facilitating User Research</li>
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
                            <li className="highlightItem companyItem"><a href="https://www.cure.fit/" target="_blank" rel="noopener noreferrer"><img src={curefit} alt="Cure Fit" /></a></li>
                            <li className="highlightItem companyItem"><a href="https://www.media.net/" target="_blank" rel="noopener noreferrer"><img src={medianet} alt="Media.net" /></a></li>
                            <li className="highlightItem companyItem"><a href="https://www.toppr.com/" target="_blank" rel="noopener noreferrer"><img src={toppr} alt="Toppr" /></a></li>
                            <li className="highlightItem companyItem"><a href="https://www.myntra.com/" target="_blank" rel="noopener noreferrer"><img src={jabong} alt="Jabong" /></a></li>
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

            <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                <div className="containerRight">
                    <div className="titleWrapper">
                        <h2 className="sectionTitle darkText">Case Studies</h2>
                        <div className="ctaWrapper">
                            <Cta
                                ctaText={"SEE THEM ON BEHANCE"}
                                linkOut={"https://www.behance.net/atulkhola"}
                                mode="dark"
                                className="ctaText"
                            />
                            <span className="ctaArrow darkText"><Icon icon={"arrow-right2"} size={20} /></span>
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
                </div>
            </section>

            {/* Articles */}

            <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                <div className="containerRight">
                    <div className="titleWrapper">
                        <h2 className="sectionTitle">Articles</h2>
                        <div className="ctaWrapper">
                            <Cta
                                ctaText={"SEE THEM ON MEDIUM"}
                                linkOut={"https://www.medium.com/@atulkhola"}
                                mode="light"
                                className="ctaText"
                            />
                            <span className="ctaArrow"><Icon icon={"arrow-right2"} size={20} /></span>
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
                </div>
            </section>

            {/* Interactions */}

            <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                <div className="containerRight">
                    <div className="titleWrapper">
                        <h2 className="sectionTitle darkText">Interactions</h2>
                        <div className="ctaWrapper">
                            <Cta
                                ctaText={"SEE ON DRIBBBLE"}
                                linkOut={"https://dribbble.com/atulkhola"}
                                mode="dark"
                                className="ctaText"
                            />
                            <span className="ctaArrow darkText"><Icon icon={"arrow-right2"} size={20} /></span>
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

            <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
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
                </div>
            </section>

            {/* Instagram */}

            <section className="section introSection lightSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                <div className="containerRight dFlex">
                    <div className="titleWrapper blockWrapper">
                        <span className="introTitle darkText">&amp; there's so much more to life than</span>
                        <h2 className="sectionTitle darkText">just work ✨</h2>
                    </div>
                    <div className="ctaWrapper">
                        <Cta
                            ctaText={"SEE THEM ON INSTAGRAM"}
                            linkOut={"https://www.instagram.com/pixelandpump"}
                            mode="dark"
                            className="ctaText"
                        />
                        <span className="ctaArrow darkText"><Icon icon={"arrow-right2"} size={20} /></span>
                    </div>
                </div>
                <div className="dataWrapper dataHighlightScroll">
                    <div className="topIntList">
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

            <section className="section introSection" ref={(e) => { this.addToRefs(e, 'section') }}>
                <div className="containerRight fullHeight">
                    <div className="sectionWrapper fullHeight">
                        <div className="sectionLeft fullHeight">
                            <div className="titleWrapper blockWrapper">
                                <span className="introTitle">Your company, a runway of brainstormed ideas, a hell of a <span className="textScribble">coffee<span className="scribble"><img src={scribble} alt="scribble" /></span></span> beer and gateway to spectacular.</span>
                                <h2 className="sectionTitle bottomSectionTitle">Lets connect!</h2>
                            </div>
                            <div className="ctaWrapper">
                                <Cta
                                    ctaText={"SEND ME A HELLO"}
                                    linkOut={"mailto:atul@designdrug.co"}
                                    className="ctaText"
                                />
                                <span className="ctaArrow"><Icon icon={"arrow-right2"} size={20} /></span>
                            </div>
                            <div className="contactBottom">
                                <ul className="socialList">
                                    <li><a href="https://www.behance.net/atulkhola" target="_blank"><img src={behance} alt="Behance" /></a></li>
                                    <li><a href="https://medium.com/@atulkhola" target="_blank" rel="noopener noreferrer"><img src={medium} alt="Medium" /></a></li>
                                    <li><a href="https://dribbble.com/atulkhola" target="_blank" rel="noopener noreferrer"><img src={dribbble} alt="Dribbble" /></a></li>
                                    <li><a href="https://www.linkedin.com/in/atulkhola/" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn" /></a></li>
                                    <li><a href="https://www.instagram.com/pixelandpump" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a></li>
                                </ul>
                                <span className="madeWithLove">made with ❤️</span>
                            </div>
                        </div>
                        <div className="sectionRight" ref={(e) => { this.addToRefs(e, 'sectionRight') }}>
                            <span className="checkbox"><img src={checkbox} alt="checkbox" /></span>
                            <span className="hand"><img src={hand} alt="hand" /></span>
                            <span className="hearts"><img src={hearts} alt="hearts" /></span>
                            <span className="puzzles"><img src={puzzles} alt="puzzles" /></span>
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
        </ReactFullpage.Wrapper>)

        return (
            <div className="main">
                {/* Header */}
                <Header />
                {/* Intro section */}
                <ReactFullpage
                    anchors={['section0', 'section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9']}
                    licenseKey={'FC6B124C-C6764B89-B7AC3D1E-0A9B9421'}
                    render={comp => { return compBody }}
                />
            </div>
        )
    }
}

export default Main;