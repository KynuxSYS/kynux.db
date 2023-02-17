
## kynux.db


**Support:** [discord.gg/TfCU3XrG5A](https://discord.gg/TfCU3XrG5A) <br>
**NPM:** [npmjs.com/kynux.db](https://www.npmjs.com/package/kynux.db)

```js
const { db } = require("kynux.db");

(async () => {
    await db.set("userInfo", { difficulty: "Diffulct" });

    await db.get("userInfo");

    await db.set("userInfo.difficulty");

    await db.set("userInfo", { difficulty: "Easy" });
    await db.push("userInfo.items", "Golden_Sword");
    await db.add("userInfo.balance", 500);
    await db.push("userInfo.items", "Watch");
    await db.add("userInfo.balance", 500);
    await db.get("userInfo.balance"); // -> 1000
    await db.get("userInfo.items"); 
})();
```

