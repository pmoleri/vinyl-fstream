"use strict";

const fstream = require("fstream");
const vfs = require("../lib/adapter");
const File = require("vinyl");
const expect = require("chai").expect;

describe("When reading a fstream", function () {

    const vinylFiles = [];
    before(function(done) {
        vfs.src(fstream.Reader("./"))
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

    it("first file to have stats", function() {
        let file = vinylFiles[0];
        expect(file).to.have.property("stat");
        expect(function() {return file.stat.isDirectory()}).to.not.throw();
    });
});
