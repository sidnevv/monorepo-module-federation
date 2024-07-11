import path from 'path';
import {BuildPaths, buildWebpackConfig} from '@packages/build-config'
import webpack from "webpack";
import packageJson from "./package.json";

interface Env {
    mode?: 'development' | 'production';
    port?: number;
    analyzer?: boolean;
    platform?: 'mobile' | 'desktop',
    SHOP_REMOTE_URL?: string
    ADMIN_REMOTE_URL?: string
}

export default (env: Env) => {
    const paths: BuildPaths = {
        dist: path.resolve(__dirname, "dist"),
        entry: path.resolve(__dirname, "src", "index.tsx"),
        html: path.resolve(__dirname, "public", "index.html"),
        src: path.resolve(__dirname, "src"),
        public: path.resolve(__dirname, "public"),
    }

    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001'
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002'

    const config: webpack.Configuration = buildWebpackConfig({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer ?? false,
        platform: env.platform ?? 'desktop'
    })

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',
        remotes: {
          shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
          admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
        },
        shared: {
            ...packageJson.dependencies
        }
    }))

    return config
}