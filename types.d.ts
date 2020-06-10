export interface RedditListingResponse {
  kind: 'Listing' | null;
  data: {
    modhash: null;
    dist: number;
    children: RedditPost[];
    after: null | string;
    before: null | string;
  } | null;
}

// Incomplete interface - needs to be expanded as functionality added
export interface RedditPost {
  kind: string;
  data: {
    approved_at_utc: string | null;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked: boolean;
    title: string;
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number;
    downs: number;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    ups: number;
    total_awards_received: number;
    is_original_content: boolean;
    is_meta: boolean;
    can_mod_post: boolean;
    score: number;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    is_self: boolean;
    created: number;
    link_flair_type: string;
    wls: number;
    author_flair_type: string;
    domain: string;
    allow_live_comments: boolean;
    selftext_html: string;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    visited: boolean;
    subreddit_id: string;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    author: string;
    num_comments: number;
    send_replies: boolean;
    whitelist_status: string;
    contest_mode: boolean;
    author_patreon_flair: boolean;
    permalink: string;
    parent_whitelist_status: string;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    is_video: boolean;
    post_hint: string;
  };
}
