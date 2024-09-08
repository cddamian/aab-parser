interface Manifest {
    compiledSdkVersionCodename: number;
    compiledSdkVersion: number;
    versionCode: number;
    versionName: string;
    packageName: string;
}
export declare function parseAabManifest(file: string | Buffer): Promise<Manifest>;
export {};
