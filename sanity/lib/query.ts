import { groq } from "next-sanity";

export const settingQuery = groq`
*[_type == 'settings' && _id == 'settings'][0]{
    ...,
}
`;

export const home_v2PageQuery = groq`
    *[ _type == "homePage" && _id == 'homePage'][0]{
        ...,
        seo{
            ...,
            seoImage{
                ...,
                asset->{
                    url,
                }
            }
        },
    }
`;

export const homePageQuery = groq`
    *[ _type == "home" && _id == 'home'][0]{
        ...,
        seo{
            ...,
            seoImage{
                ...,
                asset->,
            }
        },
        "stats": *[ _type == "settings" && _id == "settings"][0]{
        statsList[]{
            ...,
        }
    },
    }
`;

export const contactPageQuery = groq`
*[ _type == "contactPage" && _id == 'contactPage'][0]{
    ...,
    seo{
        ...,
        seoImage{
            ...,
            asset->,
        }
    },
    "stats": *[ _type == "settings" && _id == "settings"][0]{
        statsList[]{
            ...,
        }
    },
}
`;

export const privacyPoliciesQuery = groq`
*[_type == "privacyPolicies" && _id == "privacyPolicies"][0]{
    ...,
    seo{
        ...,
        seoImage{
            ...,
            asset->,
        }
    }
}
`;

export const termsQuery = groq`
*[_type == "terms" && _id == "terms"][0]{
    ...,
    seo{
        ...,
        seoImage{
            ...,
            asset->,
        }
    }
}
`;
