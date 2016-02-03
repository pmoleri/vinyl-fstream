"use strict";

const packer = require("fstream-npm");
const vfs = require("../lib/adapter");
const File = require("vinyl");
const expect = require("chai").expect;

describe("When packaging with fstream-npm", function () {

    const vinylFiles = [];
    before(function(done) {
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