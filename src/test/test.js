import should from "should";
import * as babel from "babel-core";
import fs from "fs";
import path from "path";
import makePlugin from "./plugin";
import sourceMapSupport from "source-map-support";
import clean from "../chimpanzee-utils/node-cleaner";

sourceMapSupport.install();

describe("isotropy-ast-analyzer-db", () => {
  function run([description, dir, opts]) {
    it(`${description}`, () => {
      const fixturePath = path.resolve(
        __dirname,
        "fixtures",
        dir,
        `fixture.js`
      );

      const pluginInfo = makePlugin(opts);

      const callWrapper = () => {
        babel.transformFileSync(fixturePath, {
          plugins: [
            [
              pluginInfo.plugin,
              {
                projects: [
                  {
                    dir: "dist/test",
                    modules: [
                      {
                        source: "fixtures/my-db",
                        locations: [
                          { name: "todos", connStr: "redis://127.0.0.1:6379" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "transform-object-rest-spread"
          ],
          parserOpts: {
            sourceType: "module",
            allowImportExportEverywhere: true
          },
          babelrc: false
        });
        return pluginInfo.getResult();
      };

      return dir.includes("error")
        ? should(() => callWrapper()).throw(
            /Compilation failed. Not a valid isotropy operation./
          )
        : (() => {
            const expected = require(`./fixtures/${dir}/expected`);
            const result = callWrapper();
            const actual = clean(result.analysis);
            actual.should.deepEqual(expected);
          })();
    });
  }

  const tests = [
    ["collection", "collection"],
    ["get", "get"],
    ["put", "put"],
    ["del", "del"],
    // ["count", "count"],
    // ["update", "update"]
    ["read-call-error", "read-call-error"],
    ["read-member-error", "read-member-error"],
    ["write-error", "write-error"]
  ];

  for (const test of tests) {
    run(test);
  }
});
