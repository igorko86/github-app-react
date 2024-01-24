export type UserInfo = {
    name: string;
    repos: number;
    created: string;
    reposUrl: string;
    languages: { sum: number; languages: { [key: string]: {size: number; name: string} }}
    repositories: Repo[]; // TODO fix any
}
export type Repo = {
    id: number;
    name: string;
    languagesUrl: string;
    publicUrl: string;
}