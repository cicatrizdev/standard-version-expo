import { androidBuildnumReader, androidBuildnumWriter } from "../helpers";
import { VersionWriter } from "../../../types";

/**
 * Read the buildnum stored at versionCode in the build.gradle.
 */
export const readVersion = androidBuildnumReader;

/**
 * Increment the buildnum stored at versionCode in the build.gradle.
 * This ignores the provided version.
 */
export const writeVersion: VersionWriter = (contents, _version) => {
	const versionCode = `${new Date().getFullYear()}${String(
		new Date().getMonth() + 1
	).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
		new Date().getHours()
	).padStart(2, "0")}`;

	return androidBuildnumWriter(contents, String(versionCode));
};
