module.exports = async (fetchFn, id, accessToken, idKey, objectKey) => {
	const limit = 50;
	let offset = 0;
	let allItems = [];
	let hasMore = true;

	while (hasMore) {
		let data;
		if (id) {
			data = await fetchFn(id, { limit, offset }, accessToken);
		} else {
			data = await fetchFn({ limit, offset }, accessToken);
		}
		allItems = [...allItems, ...data.items];
		offset += limit;
		hasMore = data.items.length === limit;
		// hasMore = false;
	}

	if (idKey) {
		return [
			...new Map(
				allItems.map((item) => [
					objectKey ? item[objectKey][idKey] : item[idKey],
					item,
				])
			).values(),
		];
	}
	return allItems;
};
