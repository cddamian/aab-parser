import { loadAsync } from 'jszip';
import { readFile } from 'node:fs/promises';
import { XmlNode } from './proto/Resources';

interface Manifest {
  compiledSdkVersionCodename: number,
  compiledSdkVersion: number,
  versionCode: number,
  versionName: string,
  packageName: string,
}

interface Attribute {
  value: string,
  name: string,
}

export async function parseAabManifest(file: string | Buffer): Promise<Manifest> {
  if (typeof file === 'string') return parseAabManifest(await readFile(file));

  const manifestXmlNodeJson = XmlNode.toJSON(XmlNode.decode(await loadAsync(file)
    .then(zip => zip.file('base/manifest/AndroidManifest.xml')?.async('nodebuffer'))
    .then(manifestFile => manifestFile ?? throwMissingAndroidManifestInsideTheBundle())));

  return manifestXmlNodeJson.element.attribute.reduce((object: any, attribute: Attribute) => {
    switch (attribute.name) {
      case 'compileSdkVersionCodename':
        return { ...object, 'compiledSdkVersionCodename': attribute.value };
      case 'compileSdkVersion':
        return { ...object, 'compileSdkVersion': +attribute.value };
      case 'versionCode':
        return { ...object, 'versionCode': +attribute.value };
      case 'versionName':
        return { ...object, 'versionName': attribute.value };
      case 'package':
        return { ...object, 'package': attribute.value };
      default:
        return object;
    }
  }, {});
}

function throwMissingAndroidManifestInsideTheBundle<T>(): T {
  throw new Error('Could not find AndroidManifest.xml file inside the app bundle file');
}

