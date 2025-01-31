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
	const buildNumStr = androidBuildnumReader(contents);
	const replaced = _version.split(".").join("");
	const buildNumber = buildNumStr != "" ? Number(buildNumStr) : 0;

	if (Number.isNaN(buildNumber)) {
		throw new Error("Could not parse number from `versionCode`.");
	}

	return androidBuildnumWriter(
		contents,
		String(500000000 + parseInt(replaced, 10))
	);
};
