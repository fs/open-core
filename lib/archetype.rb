class Archetype
  TABLE_OF_CONTENTS = 'toc'

  def self.find(id)
    list.find { |archetype| archetype.id == id }
  end
end
