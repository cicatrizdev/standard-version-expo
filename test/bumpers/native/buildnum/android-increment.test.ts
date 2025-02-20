import * as stub from "../../../stub";
import {
	readVersion,
	writeVersion,
} from "../../../../src/bumpers/native/buildnum/android-increment";

describe("readVersion", () => {
	it("returns android build number from build.gradle", () => {
		const buildnum = "5";
		const buildGradle = stub.androidBuildGradle(undefined, buildnum);

		expect(readVersion(buildGradle)).toBe(buildnum);
	});

	it("returns empty string by default", () => {
		const buildGradle = stub.androidBuildGradle();
		expect(readVersion(buildGradle)).not.toBe("");

		const buildGradleNoBuildnum = buildGradle.replace(
			/\t+versionCode +[0-9]+/m,
			""
		);

		expect(readVersion(buildGradleNoBuildnum)).toBe("");
	});
});

describe("writeVersion", () => {
	it("returns build.gradle with modified android build number", () => {
		const oldBuildNum = "4";
		const newBuildNum = "5";
		const buildGradle = stub.androidBuildGradle(undefined, oldBuildNum);
		expect(readVersion(buildGradle)).not.toBe(newBuildNum);
		const versionCode = `${new Date().getFullYear()}${String(
			new Date().getMonth() + 1
		).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
			new Date().getHours()
		).padStart(2, "0")}`;
		const modified = writeVersion(buildGradle, newBuildNum);

		expect(readVersion(modified)).toBe(versionCode);
	});

	it("returns build.gradle with modified android build number lower than 2100000000", () => {
		const oldBuildNum = "4";
		const newBuildNum = "5";
		const buildGradle = stub.androidBuildGradle(undefined, oldBuildNum);
		expect(readVersion(buildGradle)).not.toBe(newBuildNum);
		const modified = writeVersion(buildGradle, newBuildNum);

		expect(+readVersion(modified)).toBeLessThan(2100000000);
	});

	it("throws if android build number is missing", () => {
		const buildGradle = stub.androidBuildGradle();
		const buildGradleNoBuildnum = buildGradle.replace(
			/\t+versionCode +[0-9]+/m,
			""
		);

		expect(() => writeVersion(buildGradleNoBuildnum, "ignored")).toThrow();
	});
});
