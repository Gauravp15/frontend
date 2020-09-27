import customFetch from './customFetch';
import { get } from 'lodash-es';

const BASE_WP_URL = "http://localhost:8000/wp-json/wp/v2/";
const GET_MEDIA_IMAGE = `${BASE_WP_URL}/media`;

export function getTestimonials() {
    let testimonialApiCall = customFetch(
        BASE_WP_URL + 'testimonials?_embed',
        "GET"
    );

    let testimonials = [];
    testimonialApiCall.then(res => {
        if (get(res, "status", 200) === 200) {
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
            });
        }

    }).catch(e => {
        console.log('Testimonials', e);
    });
}

export function getCaseStudies() {
    let caseStudiesApiCall = customFetch(
        BASE_WP_URL + 'case_studies',
        "GET"
    );

    let caseStudies = [];
    caseStudiesApiCall.then(res => {
        if (get(caseStudiesApiCall, "status", 200) === 200) {
            caseStudies = [...get(caseStudiesApiCall, "data", [])];
        }
    }).catch(e => {
        console.log('Case Studies', e);
    });
}

export function getArticles() {
    let articlesApiCall = customFetch(
        BASE_WP_URL + 'articles',
        "GET"
    );

    let articles = [];
    articlesApiCall.then(res => {
        if (get(articlesApiCall, "status", 200) === 200) {
            articles = [...get(articlesApiCall, "data", [])];
            return articles;
        }
    }).catch(e => {
        console.log('Articles', e);
    });
}