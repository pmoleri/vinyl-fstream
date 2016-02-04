"use strict";

import fstream from "fstream";
import vfs from "../lib/adapter";
import File from "vinyl";
import {expect} from "chai";

describe("When reading a fstream", function () {

    const vinylFiles = [];
    before(function(done) {
        this.timeout(15*1000);
        vfs.src(fstream.Reader("./"))
            .on('finish', done)
            .on('data', (f) => {vinylFiles.push(f)});
    });

    it("to have files", function() {
        expect(vinylFiles).to.not.be.empty;
    });

    it("every file to be a Vinyl", function() {
        expect(vinylFiles.every(File.isVinyl)).to.ok;
    });

    it("find a package.json file", function() {
        let file;
        for (let _file of vinylFiles) {
            if (_file.basename === "package.json") {
                file = _file;
            }
        }
        expect(file).to.be.ok;
    });

    it("find current file", function() {
        let file;
        for (let _file of vinylFiles) {
            if (_file.path === __filename.split("\\").join("/")) {
                file = _file;
            }
        }
        expect(file).to.be.ok;
    });

    it("first file to have stats", function() {
        let file = vinylFiles[0];
        expect(file).to.have.property("stat");
        expect(function() {return file.stat.isDirectory()}).to.not.throw();
    });
});
