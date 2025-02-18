import { parse, serialize } from "../expo";
import { androidVersionReader } from "../helpers";
import { VersionWriter } from "../types";

/**
 * Read the manifest version from the `expo.android.versionCode` property.
 */
export const readVersion = androidVersionReader;

/**
 * Write the manifest version to the `expo.android.versionCode` property.
 * This uses the an incremental approach, and ignores the provided version.
 */
export const writeVersion: VersionWriter = (contents, _version) => {
	const manifest = parse(contents);
	const versionCode = `5${new Date().getFullYear()}${String(
		new Date().getMonth() + 1
	).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}`;
	manifest.expo.android = manifest.expo.android || {};
	manifest.expo.android.versionCode = +versionCode;

	return serialize(manifest, contents);
};
