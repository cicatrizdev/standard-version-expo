import * as stub from "../stub";
import { readVersion, writeVersion } from "../../src/bumpers/android-increment";

describe("readVersion", () => {
	it("returns android version code from manifest", () => {
		expect(readVersion(stub.manifestRaw)).toBe(
			String(stub.manifest().expo.android!.versionCode)
		);
	});

	it("returns empty string by default", () => {
		const manifest = stub.manifest();
		delete manifest.expo.android;

		expect(readVersion(JSON.stringify(manifest))).toBe("");
	});
});

describe("writeVersion", () => {
	it("returns manifest with modified android version code", () => {
		const manifest = stub.manifest();
		manifest.expo.android!.versionCode = 490000000;
		const modified = writeVersion(JSON.stringify(manifest), "3.2.1");
		const versionCode = `${new Date().getFullYear()}${String(
			new Date().getMonth() + 1
		).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
			new Date().getHours()
		).padStart(2, "0")}`;

		expect(readVersion(modified)).toBe(versionCode);
	});

	it("returns manifest with added android version code", () => {
		const manifest = stub.manifest();
		delete manifest.expo.android;
		const modified = writeVersion(JSON.stringify(manifest), "1.2.3");
		const versionCode = `${new Date().getFullYear()}${String(
			new Date().getMonth() + 1
		).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}${String(
			new Date().getHours()
		).padStart(2, "0")}`;

		expect(readVersion(modified)).toBe(versionCode);
	});

	it("returns manifest with added android version code lower than 2100000000", () => {
		const manifest = stub.manifest();
		delete manifest.expo.android;
		const modified = writeVersion(JSON.stringify(manifest), "1.2.3");
		expect(+readVersion(modified)).toBeLessThan(2100000000);
	});
});
