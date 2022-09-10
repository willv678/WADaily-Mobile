//
//  ShortcutComplicationProvider.swift
//  WatchApp Watch App
//
//  Created by Will Varner on 9/10/22.
//

import Foundation
import ClockKit
import SwiftUI

final class ShortcutComplicationProvider {
    func getShortcutComplication() -> CLKComplicationTemplate {
        return CLKComplicationTemplateGraphicCornerCircularView(ShortcutComplication())
    }
}
