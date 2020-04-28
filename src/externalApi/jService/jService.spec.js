import jService from "./index";

describe("jService", () => {
  it("has three methods we can use", () => {
    expect(jService).toHaveProperty("getCategories");
    expect(jService).toHaveProperty("getCategoryById");
    expect(jService).toHaveProperty("getCategoriesAndClues");
  });
  it("will get categories", async () => {
    const threeCategories = await jService.getCategories(3, 14);
    expect(threeCategories).toHaveLength(3);
  });
  it("will get categories and clues via jService.getCategoriesAndClues", async () => {
    const threeCategories = await jService.getCategoriesAndClues(3, 14);
    expect(threeCategories).toHaveLength(3);
    expect(threeCategories[0].title).toBe("harry truman");
    expect(threeCategories[0].clues).toHaveLength(5);
    expect(threeCategories[0].clues[0].question).toBe(
      "In 1945 Harry served just 83 days in this job"
    );
    expect(threeCategories[1].title).toBe("contract killings");
    expect(threeCategories[1].clues).toHaveLength(5);
    expect(threeCategories[1].clues[0].question).toBe(
      "If the show's named after you, they can't kill you off over a contract spat, can they?  Hmm... ask this \"Valerie\" star"
    );
    expect(threeCategories[2].title).toBe("sham, wow!");
    expect(threeCategories[2].clues).toHaveLength(5);
    expect(threeCategories[2].clues[0].question).toBe(
      "In 1925 Victor Lustig sold this 984-foot Paris landmark--twice!  Now that's a bargain for Victor at twice the price!"
    );
  });
});
