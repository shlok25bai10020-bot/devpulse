export interface IUserProfile{
id:string;
name:string;
email:string;
bio:string;
skills:string[]
gitHubUsername:string;
}

export interface IGitHubRepo{
    id:number;
    name:string;
    description:string | null;
    html_url:string;
    stargazers_count:number;
    language:string | null;
    updated_at:string;
}