import path from 'path';
import {BuildPaths, buildWebpackConfig} from '@packages/build-config'
import webpack from "webpack";
import packageJson from "./package.json";


interface Env {
    mode?: 'development' | 'production';
    port?: number;
    analyzer?: boolean;
    platform?: 'mobile' | 'desktop'
}

export default (env: Env) => {
    const paths: BuildPaths = {
        dist: path.resolve(__dirname, "dist"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public"),
    }

    const config: webpack.Configuration = buildWebpackConfig({
        port: env.port ?? 3001,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer ?? false,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'shop',
        filename: 'remoteEntry.js',
        exposes: {
            './Router': './src/router/Router.tsx'
        },
        shared: {
            ...packageJson.dependencies,
        }
    }))

    return config
}