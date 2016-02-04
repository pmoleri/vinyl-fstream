"use strict";

import packer from "fstream-npm";
import vfs from "../lib/adapter";
import File from "vinyl";
import {expect} from "chai";

describe("When packaging with fstream-npm", function () {

    const vinylFiles = [];
    before(function(done) {
        this.timeout(15*1000);
        vfs.src(packer("./"))
            .on('data', (f) => {vinylFiles.push(f)})
            .on('finish', done);
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
});
