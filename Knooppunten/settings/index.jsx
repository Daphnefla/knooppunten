const list = [
  {
      "lan": "4.244524572",
      "lon": "50.16653443",
      "value": "1",
      "name": "1, 1000 bornes à vélo"
  },
  {
      "lan": "4.232289334",
      "lon": "50.1097714",
      "value": "13",
      "name": "13, Brussel"
  },
  {
      "lan": "4.475320065",
      "lon": "50.30255747",
      "value": "10",
      "name": "10, Limburg"
  },
  {
      "lan": "4.475320065",
      "lon": "50.30255747",
      "value": "100",
      "name": "100, Antwerpen"
  },
  {
      "lan": "4.475320065",
      "lon": "50.30255747",
      "value": "20",
      "name": "20, Antwerpen"
  },
];



function renderMainPage(props) {
  return (
    <Page>

      <Section title="Simple item list">
        <AdditiveList
          title="A list with Autocomplete"
          settingsKey="list"
          maxItems="5"
          addAction={(
            <TextInput
              title="Add List Item"
              label="➡️ Add item"
              placeholder="Type something"
              action="Add Item"
              onAutocomplete={(value) => list.filter((option) => option.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)}
            />
          )}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage((props) => {
  let result = renderMainPage;
  return result(props);
});
