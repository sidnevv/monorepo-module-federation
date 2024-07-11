export interface BuildPaths {
    entry: string
    html: string
    dist: string
    src: string
    public: string
}

export interface BuildOptions {
    port: number
    paths: BuildPaths
    mode: 'development' | 'production';
    analyzer?: boolean
    platform: 'mobile' | 'desktop'
}